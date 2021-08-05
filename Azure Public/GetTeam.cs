using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Threading.Tasks;
using System;

namespace TeamDonate
{
    public static class GetTeam
    {
        [FunctionName("GetTeam")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = "GetTeam/{pk}/{id}")] HttpRequest req,
            ILogger log,
            [CosmosDB(
                databaseName: "TeamDonate",
                collectionName: "Teams",
                ConnectionStringSetting = "CosmosDb",
                Id = "{id}",
                PartitionKey = "{pk}"
            )] JObject team)
        {
            return new OkObjectResult(team.ToString());
        }
    }
}
