using System;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace TeamDonate
{
    public static class ExpireEvents
    {
        [FunctionName("ExpireEvents")]
        public static void Run([TimerTrigger("0 0 0 * * MON")] TimerInfo myTimer, ILogger log)
        {
            // TODO ExpireEvents
            log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");

        }
    }
}
