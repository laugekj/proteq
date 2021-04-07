using System;  
using System.IO;  
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Stripe;

namespace test.Controllers
{
    public class PaymentController : Controller
    {

        [HttpPost]
        public ActionResult Processing()
        {
            StripeConfiguration.ApiKey = "sk_test_51IbPuXH6yYcILY3f7ol7ocIOUKn4P61XApXijAKp01WhxTR9kHYPIq0Tw31j9ZBocqt4TD2GLHxAn1l6d5kTvkWk00oIa5G4Ih";

            // `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
            var options = new ChargeCreateOptions
            {
            Amount = 10,
            Currency = "dkk",
            Source = "tok_mastercard",
            Description = "My First Test Charge (created for API docs)",
            };
            var service = new ChargeService();
            service.Create(options);
            return Ok();
        }
    }
}