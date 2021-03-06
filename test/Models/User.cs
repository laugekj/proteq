using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace test.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Phone { get; set; }

        public string Firstname { get; set; }

        public string Lastname { get; set; }   

        public string Company { get; set; }

        public string Email { get; set; }
        
        public string Token { get; set; }
        
        public bool HasPaid { get; set; }

        public bool IsAdmin { get; set; }

        public string PaymentToken { get; set; }

        public UserRegistration UserReg { get; set; }

        public List<UserStep> UserSteps { get; set; }
    }
}
