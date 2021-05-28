using System;  
using System.Collections.Generic;  
using System.ComponentModel.DataAnnotations;  
using System.Linq;  
using System.Web;  
  
namespace test.Models
{  
    public class PaymentToken  
    {  
        public string url { get; set; }  
  
        public string paymentToken { get; set; }
    }  
}  