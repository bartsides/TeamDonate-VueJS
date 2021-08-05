using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;
using System;

namespace TeamDonate
{
    public static class UpdateEvent
    {
        [FunctionName("UpdateEvent")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = "UpdateEvent/{id}")] HttpRequest req,
            ILogger log,
            [CosmosDB(
                databaseName: "TeamDonate",
                collectionName: "Events",
                ConnectionStringSetting = "CosmosDb",
                Id = "{id}",
                PartitionKey = "{id}"
            )] JObject oldEvent)
        {
            var eventJson = JObject.Parse(req.Body.GetBody());

            // Update event
            var events = await Helpers.GetContainerAsync("Events");
            var eventPk = new PartitionKey(eventJson["id"].ToString());
            var eventRes = await events.UpsertItemStreamAsync(eventJson.ToStream(), eventPk);
            if (!eventRes.IsSuccessStatusCode) throw new Exception("Failed to update event");

            // Check if name or date have changed
            var updateTeams = oldEvent["name"].ToString() != eventJson["name"].ToString() ||
                oldEvent["date"].ToString() != eventJson["date"].ToString();
            if (updateTeams)
            {
                log.LogInformation("Event name or date changed. Updating teams");
                await UpdateTeams(eventJson, eventPk, log);
            }

            return new OkResult();
        }

        private static async Task UpdateTeams(JObject eventJson, PartitionKey eventPk, ILogger log)
        {
            var teamsContainer = await Helpers.GetContainerAsync("Teams");
            using var iterator = teamsContainer.GetItemQueryStreamIterator("SELECT * FROM c", null,
                new QueryRequestOptions() { PartitionKey = eventPk });

            var eventName = eventJson["name"].ToString();
            var eventDate = eventJson["date"].ToString();

            while (iterator.HasMoreResults)
            {
                foreach (var team in await iterator.GetResultsAsync())
                {
                    var teamName = team["name"].ToString();

                    log.LogInformation($"Updating team {teamName}");

                    team["event"] = eventName;
                    team["date"] = eventDate;

                    var teamRes = await teamsContainer.UpsertItemStreamAsync(team.ToStream(), eventPk);
                    if (!teamRes.IsSuccessStatusCode)
                        log.LogError($"Error updating team {teamName}: {teamRes.ErrorMessage}");
                }
            }
        }
    }
}
