using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using test.Models;
using System.Collections.Generic;
using System.Linq;

using System.IO;

namespace test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DownloadController : ControllerBase
    {


        private readonly UserContext _context;

        public DownloadController(UserContext context)
        {
            _context = context;
        }

        ///api/download
        [HttpGet("{stepId}", Name = "GetFiles")] 
        public IEnumerable<IActionResult> GetAllFilesFromStepId(int stepId)
        {
            Console.WriteLine("[DEVELOPER MODE] StepId: " + stepId);
            
        // 1. Find files associated with stepId:
        var files = _context.Files.Where(file => file.StepId == stepId);
        
        foreach (var file in files) {
            yield return File(file.FileData, file.FileType); 
        }

        yield break;
        }


    }
}