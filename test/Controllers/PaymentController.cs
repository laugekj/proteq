using System;  
using System.IO;  
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Stripe;
using test.Models;

namespace test.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : Controller
    {

        [HttpPost]
        public ActionResult Processing(string token)
        {
            // Set your secret key. Remember to switch to your live secret key in production.
            // See your keys here: https://dashboard.stripe.com/account/apikeys
            StripeConfiguration.ApiKey = "sk_test_51IbPuXH6yYcILY3f7ol7ocIOUKn4P61XApXijAKp01WhxTR9kHYPIq0Tw31j9ZBocqt4TD2GLHxAn1l6d5kTvkWk00oIa5G4Ih";

            // Token is created using Checkout or Elements!
            // Get the payment token submitted by the form:
            //var token = model.Token; // Using ASP.NET MVC

            var options = new ChargeCreateOptions
            {
                Amount = 999,
                Currency = "usd",
                Description = "Example charge",
                Source = "tok_mastercard",
            };
            var service = new ChargeService();
            var charge = service.Create(options);

            return Ok();
        }

        
    }
}