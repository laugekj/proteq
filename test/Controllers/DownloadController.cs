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


        //api/download/GetFileById/ + fileId
        [HttpGet]
        [Route("[action]/{fileId}")]
        public IActionResult GetFileById(int fileId)
        {
            var file = _context.Files.FirstOrDefault(x => x.Id == fileId);
            
            if (file == null)
            {
                return NotFound();
            }
            return File(file.FileData, file.FileType);
        }
        
        //api/download/GetAllFilesFromStepId/ + stepId
        [HttpGet] 
        [Route("[action]/{stepId}")]
        public List<FileModel> GetAllFilesFromStepId(int stepId)
        {
        
        Console.WriteLine("[DEVELOPER MODE] StepId: " + stepId);
            
        // 1. Find files associated with stepId:
        var files = _context.Files.Where(file => file.StepId == stepId).ToList();
        
        return files;

        }
        


    }
}