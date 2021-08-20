using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System.Linq;
using System.Security.Claims;
using System;

namespace TeamDonate
{
    public static class UpdateOrganization
    {
        [FunctionName("UpdateOrganization")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = "UpdateOrganization/{id}")] HttpRequest req,
            ILogger log,
            ClaimsPrincipal claimsPrincipal,
            [CosmosDB(
                databaseName: "TeamDonate",
                collectionName: "Organizations",
                ConnectionStringSetting = "CosmosDb",
                Id = "{id}",
                PartitionKey = "{id}"
            )] JObject organizationData,
            [CosmosDB(
                databaseName: "TeamDonate",
                collectionName: "Organizations",
                ConnectionStringSetting = "CosmosDb"
            )] out object organization)
        {
            var organizationJson = JObject.Parse(req.Body.GetBody());
            
            if (!string.Equals(organizationData["id"].ToString(), organizationJson["id"].ToString(), 
                    StringComparison.CurrentCultureIgnoreCase)) {
                organization = null;
                return new BadRequestObjectResult("Payload id does not match id in route");
            }

            var authorized = false;
            foreach (var admin in organizationData["admins"])
            {
                if (string.Equals(admin["id"].ToString(), Helpers.GetId(claimsPrincipal),
                    StringComparison.CurrentCultureIgnoreCase))
                {
                    authorized = true;
                    break;
                }
            }

            if (true || !authorized && !Helpers.IsAdmin(claimsPrincipal))
            {
                organization = null;
                return new UnauthorizedResult();
            }

            if (!string.Equals(organizationData["name"], organizationJson["name"]))
            {
                log.LogInformation("Organization changed names. Updating teams");
                UpdateTeams(organizationJson, log);
            }

            organization = organizationJson;
            return new OkResult();
        }

        private static void UpdateTeams(JObject organization, ILogger log)
        {
            var teamsContainer = Helpers.GetContainer("Teams");
            var query = new QueryDefinition("SELECT * FROM c WHERE c.organizationid = @organizationid")
                .WithParameter("@organizationid", organization["id"].ToString());
            using var iterator = teamsContainer.GetItemQueryStreamIterator(
                query, null, new QueryRequestOptions() { MaxConcurrency = -1 }
              );
            var organizationName = organization["name"].ToString();

            while (iterator.HasMoreResults)
            {
                var teams = iterator.GetResults();
                log.LogInformation(teams == null || !teams.Any()
                    ? "No teams associated"
                    : $"Found {teams.Count()} teams");
                foreach (var team in teams)
                {
                    var teamName = team["name"].ToString();

                    log.LogInformation($"Updating team {teamName}");

                    team["organization"] = organizationName;

                    var teamRes = teamsContainer
                        .UpsertItemStreamAsync(team.ToStream(), new PartitionKey(team["eventid"].ToString()))
                        .ConfigureAwait(false).GetAwaiter().GetResult();
                    if (!teamRes.IsSuccessStatusCode)
                        log.LogError($"Error updating team {teamName}: {teamRes.ErrorMessage}");
                }
            }
        }
    }
}
