using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace test.Models
{
    public class ResetPassword
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Token { get; set; }
    }
}
