using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;

namespace TeamDonate
{
    public static class GetTeams
    {
        [FunctionName("GetTeams")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = "GetTeams/{eventid}")] HttpRequest req,
            ILogger log,
            [CosmosDB(
                databaseName: "TeamDonate",
                collectionName: "Teams",
                ConnectionStringSetting = "CosmosDb",
                SqlQuery = "SELECT * FROM c WHERE c.eventid = {eventid}"
            )] JArray teams)
        {
            return new OkObjectResult(teams.ToString());
        }
    }
}
