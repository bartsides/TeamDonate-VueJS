using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using System.Security.Claims;

namespace TeamDonate
{
    public static class CreateEvent
    {
        [FunctionName("CreateEvent")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log,
            ClaimsPrincipal claimsPrincipal,
            [CosmosDB(
                databaseName: "TeamDonate",
                collectionName: "Events",
                ConnectionStringSetting = "CosmosDb"
            )] out string newEvent)
        {
            // Verify user is admin
            if (!Helpers.IsAdmin(claimsPrincipal))
            {
                newEvent = null;
                return new UnauthorizedResult();
            }

            newEvent = req.Body.GetBody();
            return new OkResult();
        }
    }
}
