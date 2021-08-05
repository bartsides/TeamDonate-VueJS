using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace TeamDonate
{
    public static class CreateOrganization
    {
        [FunctionName("CreateOrganization")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log,
            [CosmosDB(
                databaseName: "TeamDonate",
                collectionName: "Organizations",
                ConnectionStringSetting = "CosmosDb"
            )] out object organization)
        {
            organization = req.Body.GetBody();
            return new OkResult();
        }
    }
}
