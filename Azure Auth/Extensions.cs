using Microsoft.Azure.Cosmos;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace TeamDonate
{
    public static class Extensions
    {
        public static async Task<JObject> GetItemAsync(this Container container, string id, PartitionKey partitionKey,
                ItemRequestOptions requestOptions = null) {
            var data = await container.ReadItemStreamAsync(id, partitionKey, requestOptions);
            if (data?.Content == null) return null;

            return JObject.Parse(data.Content.GetBody());
        }

        public static JToken GetResults(this FeedIterator iterator)
        {
            using var res = iterator.ReadNextAsync().ConfigureAwait(false).GetAwaiter().GetResult();
            using var sr = new StreamReader(res.Content);
            using var jtr = new JsonTextReader(sr);
            var jobject = JObject.Load(jtr);
            if (jobject == null) return null;
            return jobject["Documents"];
        }

        public static async Task<JToken> GetResultsAsync(this FeedIterator iterator)
        {
            using var res = await iterator.ReadNextAsync();
            using var sr = new StreamReader(res.Content);
            using var jtr = new JsonTextReader(sr);
            var jobject = JObject.Load(jtr);
            if (jobject == null) return null;
            return jobject["Documents"];
        }

        public static string GetBody(this Stream stream)
        {
            if (stream == null) return null;
            using var reader = new StreamReader(stream);
            return reader.ReadToEnd();
        }

        public static Stream ToStream(this JObject json)
        {
            return new MemoryStream(Encoding.UTF8.GetBytes(json.ToString()));
        }

        public static Stream ToStream(this JToken json)
        {
            return new MemoryStream(Encoding.UTF8.GetBytes(json.ToString()));
        }
    }
}