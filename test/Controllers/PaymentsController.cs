// This example sets up an endpoint using the ASP.NET MVC framework.
// Watch this video to get started: https://youtu.be/2-mMOB8MhmE.
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;

namespace test.Controllers
{
[ApiController]
[Route("api/[controller]")]
  public class PaymentsController : Controller
  {
    public PaymentsController()
    {
      StripeConfiguration.ApiKey = "sk_test_51IbPuXH6yYcILY3f7ol7ocIOUKn4P61XApXijAKp01WhxTR9kHYPIq0Tw31j9ZBocqt4TD2GLHxAn1l6d5kTvkWk00oIa5G4Ih";
    }

    [HttpPost("create-checkout-session")]
    public ActionResult CreateCheckoutSession()
    {
      var options = new SessionCreateOptions
      {
        PaymentMethodTypes = new List<string>
        {
          "card",
        },
        LineItems = new List<SessionLineItemOptions>
        {
          new SessionLineItemOptions
          {
            PriceData = new SessionLineItemPriceDataOptions
            {
              UnitAmount = 139900, // 1.399,00 kr.
              Currency = "dkk",
              ProductData = new SessionLineItemPriceDataProductDataOptions
              {
                Name = "GDPR pakken",
              },

            },
            Quantity = 1,
          },
        },
        Mode = "payment",
        SuccessUrl = "http://localhost:5000/success",
        CancelUrl = "http://localhost:5000/checkout",
      };
      var service = new SessionService();
      Session session = service.Create(options);
      return Json(new { id = session.Id });
    }
  }
}