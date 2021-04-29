using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using test.Models;
using test.Services;
using System.Net;
using System.Web;
using System.Net.Mail;
using Microsoft.AspNetCore.Http;
using System.Net.Mime;


namespace test.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UserLoginController : ControllerBase
    { 
    private readonly UserContext _context;

    public UserLoginController(UserContext context)
    {
        _context = context;

    
    }



        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<User> Login(UserLogin typedUser)    
        {    
            var _passWord = encryptPassword.textToEncrypt(typedUser.Password);    
            bool Isvalid = _context.UserRegistrations.Any(x => x.Mail == typedUser.Mail && x.Password == _passWord);
        
            if (Isvalid)    
            {    
                //User user = new User();
                // [DEVELOPER MODE]: CATCH THE USER DATA

                // Catch userId from context : 'UserRegistrations'
                var _userId = _context.UserRegistrations.FirstOrDefault(x => x.Mail == typedUser.Mail && x.Password == _passWord).UserId;

                // Catch all user information from table : 'Users'
                User _user = _context.Users.FirstOrDefault(x => x.Id == _userId);
                return _user;
            } 
            return Unauthorized();      
        }


        // /api/userlogin/createresetmodel
        [HttpPost]
        [Route("[action]")]
        public ActionResult CreateResetModel(MailUrl mailUrlModel) {
            
            //Check that the mail is actually a registrered mail
            var mailInDb = _context.UserRegistrations.Where(x => x.Mail == mailUrlModel.Mail).SingleOrDefault<UserRegistration>();
            if(mailInDb == null) 
            {
                return BadRequest();
            }

            ResetPassword model = new ResetPassword();
            model.Id = _context.ResetPasswords.Any() ? _context.ResetPasswords.Max(p => p.Id) + 1 : 1;
            model.Email = mailUrlModel.Mail;
            model.Token = TokenAndUrlService.generateToken(model.Id, "rp");
            
            // Add the ResetPasswordRequest to the ResetPasswords table
            _context.ResetPasswords.Add(model);
            _context.SaveChanges();
          
            // Send mail to recipient with unique link to the resetpassword route with token
            MailMessenger.SendPasswordResetLink(mailUrlModel.Mail, mailUrlModel.Url, model.Token);


            return Ok();
        }
    }
}
