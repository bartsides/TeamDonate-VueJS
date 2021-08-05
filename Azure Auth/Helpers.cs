using Microsoft.Azure.Cosmos;
using Newtonsoft.Json.Linq;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System;

namespace TeamDonate
{
    public static class Helpers
    {
        #region Profile
        public static string GetId(ClaimsPrincipal claimsPrincipal)
        {
            if (claimsPrincipal?.Claims == null) return null;
            return claimsPrincipal.Claims.FirstOrDefault(c =>
              c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            )?.Value;
        }

        public static JToken GetProfile(ClaimsPrincipal claimsPrincipal)
        {
            var id = GetId(claimsPrincipal);

            var profilesContainer = GetContainer("Profiles");
            using var iterator = profilesContainer.GetItemQueryStreamIterator($"SELECT * FROM c", null,
              new QueryRequestOptions() { PartitionKey = new PartitionKey(id) });

            if (!iterator.HasMoreResults) return null;

            var profiles = iterator.GetResults();
            if (profiles != null && profiles.Any()) return profiles[0];

            return null;
        }

        public static bool IsAdmin(ClaimsPrincipal claimsPrincipal)
        {
            var profile = GetProfile(claimsPrincipal);
            if (profile == null) return false;

            return bool.TryParse(profile["admin"].ToString(), out var isAdmin) ? isAdmin : false;
        }
        #endregion // Profile

        #region Cosmos
        public static Container GetContainer(string container)
        {
            var client = new CosmosClient(Environment.GetEnvironmentVariable("CosmosDbUri"),
                Environment.GetEnvironmentVariable("CosmosDbKey"));

            var databaseRes = client
                .CreateDatabaseIfNotExistsAsync("TeamDonate")
                .ConfigureAwait(false).GetAwaiter().GetResult();

            var database = databaseRes.Database;
            return database.GetContainer(container);
        }

        public static async Task<Container> GetContainerAsync(string container)
        {
            var client = new CosmosClient(Environment.GetEnvironmentVariable("CosmosDbUri"),
                Environment.GetEnvironmentVariable("CosmosDbKey"));
            var databaseRes = await client.CreateDatabaseIfNotExistsAsync("TeamDonate");
            return databaseRes.Database.GetContainer(container);
        }
        #endregion // Cosmos
    }
}