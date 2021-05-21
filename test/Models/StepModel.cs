using Microsoft.AspNetCore.Http;


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

        public IFormFile FormFile { get; set; }
    }
}