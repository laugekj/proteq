using System.Collections.Generic;

namespace test.Models
{
    public class Step
    {
        public int Id { get; set; }

        public int StepNumber { get; set; }

        public int DesignId { get; set; }

        public string Title { get; set; }
        
        public string Body { get; set; }

        public string Video { get; set; }

        public bool Completed { get; set; }

        public ICollection<FileModel> Files { get; set; }
        
        public List<UserStep> UserSteps { get; set; }


    }
}