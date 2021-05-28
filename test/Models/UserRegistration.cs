using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace test.Models
{
    public class UserRegistration
    {
        public int RegrId { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public string Mail { get; set; }
        
        public string Password { get; set; }
    }
}