using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using test.Models;
using System.Net;
using System.Web;
using System.Net.Mail;
using test.Services;
using System.Text.RegularExpressions;

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



        [HttpPut]
        public ActionResult ChangePassword(MailUrlModel model)
        {
            
            var token = model.Url.Substring(model.Url.IndexOf('?') + 1);
            var resetPasswordEntity = _context.ResetPasswords.Where(x => x.Token == token).SingleOrDefault<ResetPassword>();
            // check to see if it is in the table -> token valid
            if (resetPasswordEntity == null)
            {
                return BadRequest();
            }
            var userRegEntity = _context.UserRegistrations.Where(x => x.Mail == resetPasswordEntity.Email).SingleOrDefault<UserRegistration>();
            // check to see if it is in the other table
            if (userRegEntity == null)
            {
                Console.WriteLine("entity does not exists in userRegistration table");
                return BadRequest();
            
            } else {
            // When everything is good -> Update password
               userRegEntity.Password = encryptPassword.textToEncrypt(model.Password);
               Console.WriteLine("Changes password");

            // Remove the token from the ResetPassword Table
                _context.ResetPasswords.Remove(resetPasswordEntity);

            // Save the changes
               _context.SaveChanges();
               return Ok();
           }
        } 




        // /api/UserRegistration...
        [HttpPost]
        public ActionResult<UserRegistration> Create(UserRegistration user) 
        { 
             var isExists = DoesEmailExists(user.Mail);
             if (isExists)
             {
                  return BadRequest();
             } 
          
            user.RegrId = _context.UserRegistrations.Any() ? _context.UserRegistrations.Max(p => p.RegrId) + 1 : 1;
            user.UserId =  _context.Users.Where(u => u.Email == user.Mail).First().Id;
            user.Password = encryptPassword.textToEncrypt(user.Password);
            _context.UserRegistrations.Add(user);
            _context.SaveChanges();

//            SendEmailToUser(user.Mail);
            MailMessager.SendWelcomeEmailToUser(user.Mail);
            return Ok();
            
        } 
        public bool DoesEmailExists(string mail)
        {
            var tmp = _context.UserRegistrations.Where(u => u.Mail == mail).SingleOrDefault<UserRegistration>();
            if (tmp != null)
            {
                return true;
            }
            return false;
        }
        public void SendEmailToUser(string mail)
        {
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
