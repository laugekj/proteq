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
    public class UserStepController : ControllerBase
    { 
    private readonly UserContext _context;

    public UserStepController(UserContext context)
    {
        _context = context;

    
    }

        // /api/userstep
        [HttpPost]
        public ActionResult<UserStep> Create(UserStep userStep) 
        { 
            userStep.Id = _context.UserSteps.Any() ? _context.UserSteps.Max(p => p.Id) + 1 : 1;
            _context.UserSteps.Add(userStep);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = userStep.Id}, userStep);
        } 


        // /api/userstep/id
        [HttpGet("{id}", Name = "GetUserStep")] 
        public ActionResult<UserStep> GetById(int id) 
        {    
            var item = _context.UserSteps.Find(id);     
            if (item == null)    
            {         
                return NotFound();     
            }     
        return item; 
        }


        // /api/userstep/getstepsbyuid/id
        [HttpGet]
        [Route("[action]/{id}")]
        public ActionResult<List<UserStep>> GetStepsByUID(int id)
        {
            var lst = _context.UserSteps.Where(x => x.UserId == id).ToList();

            return lst;
        }

        [HttpGet]
        public ActionResult<List<UserStep>> GetAll()
        {
            var lst = _context.UserSteps.ToList();
            return lst;
        }


        [HttpGet]
        [Route("[action]/{UID}")]
        public ActionResult<List<Step>> getSteps(int UID)
        {
            var steps = _context.Steps.ToList();
            var completedSteps = _context.UserSteps.Where(x => x.UserId == UID).ToList();

            steps.ForEach(s => {
                if (completedSteps.Any(c => c.StepId == s.Id))
                {
                    Console.WriteLine("Set til true");
                    s.Completed = true;
                }
            });
            return steps;
        }
    }
}