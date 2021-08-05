using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace TeamDonate
{
    public static class CreateProfile
    {
        [FunctionName("CreateProfile")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log,
            [CosmosDB(
                databaseName: "TeamDonate",
                collectionName: "Profiles",
                ConnectionStringSetting = "CosmosDb"
            )] out object profile)
        {
            profile = req.Body.GetBody();
            return new OkResult();
        }
    }
}
