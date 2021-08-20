using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace TeamDonate
{
    public static class UpdateTeam
    {
        [FunctionName("UpdateTeam")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = "UpdateTeam/{eventid}/{id}")] HttpRequest req,
            ILogger log,
            ClaimsPrincipal claimsPrincipal,
            [CosmosDB(
                databaseName: "TeamDonate",
                collectionName: "Teams",
                ConnectionStringSetting = "CosmosDb",
                Id = "{id}",
                PartitionKey = "{eventid}"
            )] JObject teamData)
        {            
            var teamJson = JObject.Parse(req.Body.GetBody());

            if (!string.Equals(teamData["id"].ToString(), teamJson["id"].ToString(), 
                    StringComparison.CurrentCultureIgnoreCase)) {
                return new BadRequestObjectResult("Payload id does not match id in route");
            }

            if (!string.Equals(teamData["owner"]["id"].ToString(), Helpers.GetId(claimsPrincipal),
                    StringComparison.CurrentCultureIgnoreCase) && !Helpers.IsAdmin(claimsPrincipal)) {
                return new UnauthorizedResult();
            }

            // Update team
            var teamsContainer = await Helpers.GetContainerAsync("Teams");
            var teamRes = await teamsContainer.UpsertItemStreamAsync(teamJson.ToStream(),
                new PartitionKey(teamData["eventid"].ToString()));

            if (!teamRes.IsSuccessStatusCode) 
                throw new Exception("Failed to update team");

            if (!string.Equals(teamData["name"].ToString(), teamJson["name"].ToString())) {
                await UpdateProfiles(teamJson, log);
            }

            return new OkResult();
        }

        private static async Task UpdateProfiles(JObject teamJson, ILogger log) {
            var teamId = teamJson["id"].ToString();
            var teamName = teamJson["name"].ToString();

            var profilesContainer = await Helpers.GetContainerAsync("Profiles");
            var query = new QueryDefinition("SELECT c.id FROM c JOIN t IN c.teams WHERE t.id = @teamid")
                .WithParameter("@teamid", teamId);
            using var iterator = profilesContainer.GetItemQueryStreamIterator(query);

            while (iterator.HasMoreResults)
            {
                var profiles = iterator.GetResults();
                log.LogInformation(profiles == null || !profiles.Any()
                    ? "No profiles associated"
                    : $"Found {profiles.Count()} profiles");

                foreach (var profileId in profiles) {
                    var profile = await profilesContainer.GetItemAsync(profileId.ToString(), 
                        new PartitionKey(profileId.ToString()));
                    if (profile == null) {
                        log.LogWarning($"Unable to find profile {profileId}");
                        continue;
                    }

                    var team = profile["teams"].Children().FirstOrDefault(t => 
                        string.Equals(t["id"].ToString(), teamId,
                            StringComparison.CurrentCultureIgnoreCase));
                    if (team == null) {
                        log.LogWarning("Unable to find team");
                        continue;
                    }
                    
                    team["name"] = teamName;

                    var profileRes = await profilesContainer.UpsertItemStreamAsync(profile.ToStream(),
                        new PartitionKey(profile["id"].ToString()));
                    if (!profileRes.IsSuccessStatusCode)
                        log.LogWarning("Unable to update profile");
                }
            }
        }
    }
}
