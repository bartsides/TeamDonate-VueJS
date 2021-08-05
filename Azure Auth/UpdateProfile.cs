using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System;
using System.Security.Claims;

namespace TeamDonate
{
    public static class UpdateProfile
    {
        [FunctionName("UpdateProfile")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log,
            ClaimsPrincipal claimsPrincipal,
            [CosmosDB(
                databaseName: "TeamDonate",
                collectionName: "Profiles",
                ConnectionStringSetting = "CosmosDb"
            )] out object profile)
        {
            var id = Helpers.GetId(claimsPrincipal);
            var data = JObject.Parse(req.Body.GetBody());

            if (data == null || !data["id"].ToString().Equals(id, StringComparison.CurrentCultureIgnoreCase))
            {
                profile = null;
                return new NotFoundResult();
            }

            profile = data;
            return new OkResult();
        }
    }
}
