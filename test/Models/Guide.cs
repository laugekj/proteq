using System.Collections.Generic;

namespace test.Models
{
    public class Guide
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public ICollection<string> BulletPoints { get; set; }

        public string ImageUrl { get; set; }

        public string VideoUrl { get; set; }
        
    }
}