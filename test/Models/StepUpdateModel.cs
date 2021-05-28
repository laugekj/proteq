using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace test.Models
{
    public class StepUpdateModel
    {
        public int Id { get; set; }

        public string DesignId { get; set; }

        public int StepNumber { get; set; }

        public string Title { get; set; }
        
        public string Body { get; set; }

        public string Video { get; set; }

        public List<IFormFile> FormFiles { get; set; }
    }
}