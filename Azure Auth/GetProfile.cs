using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System.Security.Claims;
using System;

namespace TeamDonate
{
    public static class GetProfile
    {
        [FunctionName("GetProfile")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "GetProfile/{id}")] HttpRequest req,
            ILogger log,
            ClaimsPrincipal claimsPrincipal,
            [CosmosDB(
                databaseName: "TeamDonate",
                collectionName: "Profiles",
                ConnectionStringSetting = "CosmosDb",
                Id = "{id}",
                PartitionKey = "{id}"
            )] JObject profile)
        {
            if (profile == null) return new NotFoundResult();

            var id = Helpers.GetId(claimsPrincipal);

            if (string.Equals(id, profile["id"].ToString(), StringComparison.CurrentCultureIgnoreCase))
                return new OkObjectResult(profile.ToString());

            return new NotFoundResult();
        }
    }
}
