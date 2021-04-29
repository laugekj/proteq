// This example sets up an endpoint using the ASP.NET MVC framework.
// Watch this video to get started: https://youtu.be/2-mMOB8MhmE.
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;
using test.Models;
using System.Linq;

namespace test.Controllers
{

[ApiController]
[Route("api/[controller]")]
  public class PaymentsController : Controller
  {
     private readonly UserContext _context;
     private string paymentToken;
  
    public PaymentsController(UserContext context)
    {
      _context = context;
      StripeConfiguration.ApiKey = "sk_test_51IbPuXH6yYcILY3f7ol7ocIOUKn4P61XApXijAKp01WhxTR9kHYPIq0Tw31j9ZBocqt4TD2GLHxAn1l6d5kTvkWk00oIa5G4Ih";
    }

    [HttpPost("create-checkout-session")]
    public ActionResult CreateCheckoutSession(User user)
    {
      // find user: entity
      var entity = _context.Users.FirstOrDefault(e => e.Id == user.Id);
      
      // check if user is found
      if (entity == null) 
      {
        return BadRequest("id must match id");
      } 
      else 
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
        SuccessUrl = "http://localhost:5000/success?" + entity.PaymentToken,
        CancelUrl = "http://localhost:5000/checkout",
      };
      var service = new SessionService();
      Session session = service.Create(options);
      return Json(new { id = session.Id });
    }
   }


      [HttpPut("{id}")]
      [Route("[action]")]
      public ActionResult VerifyPaymentToken(PaymentToken pt)
      {
          // Retrieve the paymentToken from the URL and save it
          pt.paymentToken = retrievePaymentTokenFromURL(pt.url);

          // Check if a user (entity) exists witht he given paymentToken:
          var entity = _context.Users.FirstOrDefault(e => e.PaymentToken == pt.paymentToken);
          
          // check if user is found
          if (entity == null) 
          {
            return BadRequest("PaymentToken doesn't exists in the Database");
          } 
          else 
          {
            // Confirmation (hasPaid=true)
            entity.HasPaid = true;

            // Delete the paymentToken
            entity.PaymentToken = null;

            // Save the changes
            _context.SaveChanges();
          }
          
          return Accepted();
      }


    [HttpPut("{id}")]
    [Route("[action]")]
    public ActionResult createPaymentToken(User user) 
    {
      // find user: entity
      var entity = _context.Users.FirstOrDefault(e => e.Id == user.Id);
      
      // check if user is found
      if (entity == null) {
          return BadRequest("id must match id");
      } else {
      // generate payment token
      this.paymentToken = generatePaymentToken(user.Id);

      // update database PaymentToken
      entity.PaymentToken = this.paymentToken;

      // save changes
      _context.SaveChanges();
      return Ok();
      }
    }


    private string retrievePaymentTokenFromURL(string URL) 
    {
      // http://your-website.com/success?XXXXX-paymentToken-XXXXX
      // return everything after first occurrence of ' ? '
      int startIndex = URL.IndexOf('?') + 1;
      int endIndex = URL.Length - startIndex;
      return URL.Substring(startIndex, endIndex);;
    }
    private string retrieveDomainNameFromURL(string URL) 
    {
      // http://your-website.com/success?XXXXX-paymentToken-XXXXX
      // return everything after first occurrence of ' ? '
      int startIndex = 0;
      int endIndex = URL.IndexOf('/');
      return URL.Substring(startIndex, endIndex);;
    }
    private string generatePaymentToken(int userId) 
    {   
      // example of payment token generated date 28 / 04 / 2021 with userId 19
      // pt_28042021_uid_19_XXXXXX__64_Characters_Long__XXXXXX
      string paymentToken = "pt_" + DateTime.Now.ToString("ddMMyyyy") + "_";
      paymentToken += "uid_" + userId + "_";
      paymentToken += RandomString(64);


      return paymentToken;
    }

    private static Random random = new Random();
    public static string RandomString(int length)
    {
        // Created with help from: https://stackoverflow.com/a/1344242
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        return new string(Enumerable.Repeat(chars, length)
          .Select(s => s[random.Next(s.Length)]).ToArray());
    }

  }
}