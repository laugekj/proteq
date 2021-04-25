using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using test.Models;
using System.Net;
using System.Web;
using System.Net.Mail;

namespace test.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UserRegistrationController : ControllerBase
    { 
    private readonly UserContext _context;

    public UserRegistrationController(UserContext context)
    {
        _context = context;

    
    }


        [HttpGet] 
        public ActionResult<List<UserRegistration>> GetAll() 
        {     
            return _context.UserRegistrations.ToList(); 
        } 



        // /api/UserRegistration...
        [HttpPost]
        public ActionResult<UserRegistration> Create(UserRegistration user) 
        { 
            // var isExists = DoesEmailExists(user.Mail);
            // if (isExists)
            // {
            //      return BadRequest();
            // } 
          
            user.RegrId = _context.UserRegistrations.Any() ? _context.UserRegistrations.Max(p => p.RegrId) + 1 : 1;
            user.UserId =  _context.Users.Where(u => u.Email == user.Mail).First().Id;
            user.Password = encryptPassword.textToEncrypt(user.Password);
            _context.UserRegistrations.Add(user);
            _context.SaveChanges();

            SendEmailToUser(user.Mail);
            return Ok();
            
        } 
        public bool DoesEmailExists(string mail)
        {
            var tmp = _context.UserRegistrations.Where(u => u.Mail == mail);
            if (tmp != null)
            {
                return true;
            }
            return false;
        }
        public void SendEmailToUser(string mail)
        {
            // var fromMail = new MailAddress("testmig002@gmail.com", "Test Mig");
            // var fromMailPassword = "Password1324#";
            // var toMail = new MailAddress(mail);
           

            // var smtp = new SmtpClient();
            // smtp.Host = "smpt.gmail.com";
            // smtp.Port = 587;    
            // smtp.EnableSsl = true;    
            // smtp.DeliveryMethod = SmtpDeliveryMethod.Network;    
            // smtp.UseDefaultCredentials = false;    
            // smtp.Credentials = new NetworkCredential(fromMail.Address, fromMailPassword);

            // var Message = new MailMessage(fromMail, toMail);
            // Message.Subject = "Registration Completed Motherfucker";
            // Message.Body = "<br/> Your Registration completed fren!." +
            // "<br/> enjoy live fren!";
            // Message.IsBodyHtml = true;
            // smtp.Send(Message);

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("testmig002@gmail.com", "Password1324#"),
                EnableSsl = true,
            };
            smtpClient.Send("testmig002@gmail.com", mail, "Registration COmplete", "Velkommen Til Simple GPDR");
        }

    }
}