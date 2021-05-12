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
using System.IO;
using System.Text;
using System.Drawing;
using System.Collections;

namespace test.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class FileUploadController : Controller
    { 
    private readonly UserContext _context;

    public FileUploadController(UserContext context)
    {
        _context = context;    
    }
    
        [HttpPost]
        public ActionResult uploadFile(Step data) 
        {
            Console.WriteLine("[DEVELOPER MODE] Backend uploadFile() called");
            Console.WriteLine("[# DesignId] " + data.DesignId);
            Console.WriteLine("[# Title] " + data.Title);
            Console.WriteLine("[# Body] " + data.Body);
            Console.WriteLine("[# Video] " + data.Video);
            Console.WriteLine("[# File] NONE");

            return Accepted();
        }

    }
}
