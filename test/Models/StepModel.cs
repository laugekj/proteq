using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace test.Models
{
    public class StepModel
    {
        public string DesignId { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }

        public string Video { get; set; }

        public string FileName { get; set; }
        public string type { get; set; }

        public List<IFormFile> FormFiles { get; set; }
    }
}