using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Threading.Tasks;
using System;

namespace TeamDonate
{
    public static class GetEvents
    {
        [FunctionName("GetEvents")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log,
            [CosmosDB(
                databaseName: "TeamDonate",
                collectionName: "Events",
                ConnectionStringSetting = "CosmosDb"
            )] JArray events)
        {
            return new OkObjectResult(events.ToString());
        }
    }
}
