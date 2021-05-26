using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using test.Models;
using System.Collections.Generic;
using System.Linq;

using System.IO;

namespace test.Controllers
{
    [Route("api/file")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly UserContext _context;

        public FileController(UserContext context)
        {
            _context = context;
        }

        ///api/file
        [HttpGet]
        public ActionResult<List<Step>> GetAll()
        {
            return _context.Steps.ToList();
        }

        // /api/file/getstep/id
        [HttpGet("{id}")]
        // [Route("[action]/{id}")]
        public ActionResult<Step> GetStep(int id)
        {
            return _context.Steps.Where(x => x.Id == id).FirstOrDefault<Step>();
        }


        [HttpPost]
        [Route("[action]")]
        public IActionResult CreateStep([FromForm] StepModel data)
        {
            ///////////////////////////////////////////////////////////
            Console.WriteLine("--- Data --- ");
            Console.WriteLine("DesignId: " + data.DesignId);
            Console.WriteLine("Title: " + data.Title);
            Console.WriteLine("Body: " + data.Body);
            Console.WriteLine("Video: " + data.Video);
            foreach (var formFile in data.FormFiles)
            {
                if (formFile.Length > 0)
                {
                    Console.WriteLine(formFile.FileName + ", " + formFile.ContentType);
                }
            }
            Console.WriteLine("----------------------");
            ///////////////////////////////////////////////////////////

            try
            {
                Step step = new Step();
                

                string path;
                foreach (var formFile in data.FormFiles)
                {
                    if (formFile.Length > 0)
                    {
                        path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", formFile.FileName);

                        using (Stream stream = new FileStream(path, FileMode.Create))
                        {
                            formFile.CopyTo(stream);
                        }
                        FileModel file = new FileModel();
                        byte[] fileToBytes = System.IO.File.ReadAllBytes(path);
                        file.StepId = step.Id;
                        file.Step = step;
                        file.FileData = fileToBytes;
                        file.FileType = formFile.ContentType;
                        _context.Files.Add(file); // IMPORTANT THAT Table gets inserted file row - or else return error: Object reference not set to an instance of an object.
                        step.Files.Add(file);
                    }
                }
                
                int tmp_DesignId;
                bool success = Int32.TryParse(data.DesignId.ToString(), out tmp_DesignId);
                if (success) step.DesignId = tmp_DesignId;
                if (!success) step.DesignId = 0; // default
                
                step.Title = data.Title;
                step.Body = data.Body;
                step.Video = data.Video;

                _context.Steps.Add(step);
                _context.SaveChanges();
                Console.WriteLine("Step has been successfully created!");
                return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception e)
            {
                Console.WriteLine("File POST execption: " + e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }




        private string getFileType(string fileName)
        {
            string fileType = fileName; // XXXX.jpg
            fileType = fileType.Substring(fileName.IndexOf('.') + 1); // jpg

            return fileType;
        }

        [HttpPut("{id}")]
        public ActionResult<Step> Put(int id, Step step) 
        {
           var entity = _context.Steps.FirstOrDefault(e => e.Id == id);
           if (entity == null) {
               return BadRequest("id must match id");
           } else {
                entity.Title = step.Title;
                entity.DesignId = step.DesignId;
                entity.Body = step.Body;
                entity.Files = step.Files;
                entity.Video = step.Video;
               _context.SaveChanges();
               return Ok();
           }

        }
    }
}
