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

        [HttpPut]
        [Route("[action]")]
        public ActionResult UpdateStep([FromForm] StepUpdateModel data) 
        {
            var step = _context.Steps.Where(s => s.Id == data.Id).FirstOrDefault();
            if (step == null) 
            {
                return NotFound();
            }
                step.StepNumber = data.StepNumber;

                int tmp_DesignId;

                bool success = Int32.TryParse(data.DesignId.ToString(), out tmp_DesignId);

                if (success) step.DesignId = tmp_DesignId;

                if (!success) step.DesignId = 0; // default

                step.Title = data.Title;

                step.Body = data.Body;

                step.Video = data.Video;
            
                string path;

            if (data.FormFiles != null) {

                foreach (var formFile in data.FormFiles) 
                {
                    if (formFile.Length > 0)
                    {
                        path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", formFile.FileName);

                        using (Stream stream = new FileStream(path, FileMode.Create))
                        {
                            formFile.CopyTo(stream);
                        }
                        byte[] fileToBytes = System.IO.File.ReadAllBytes(path);

                        FileModel file = PostFilesToDB(step, fileToBytes, formFile.ContentType, formFile.FileName);

                        _context.Files.Add(file); // IMPORTANT THAT Table gets inserted file row - or else return error: Object reference not set to an instance of an object.
                        
                        step.Files.Add(file);
                    }
                }
            }
            _context.SaveChanges();
            return Ok();
        }


        private FileModel PostFilesToDB(Step step, byte[] fileToBytes, string contentType, string fileName) 
        {
            FileModel file = new FileModel();
            file.StepId = step.Id;
            file.Step = step;
            file.FileData = fileToBytes;
            file.FileType = contentType;
            file.FileName = fileName;
            return file;
        }

        [HttpDelete]
        [Route("[action]/{id}")]
        public ActionResult DeleteFile(int id)
        {
            var file = _context.Files.Where(x => x.Id == id).Single<FileModel>();
            if (file == null)
            {
                return NotFound("File does not exist.");
            }
            _context.Files.Remove(file);
            _context.SaveChanges();
            return Ok("File deleted.");
        }

        [HttpDelete]
        [Route("[action]/{id}")]
        public ActionResult DeleteStep(int id)
        {
            var step = _context.Steps.Where(x => x.Id == id).Single<Step>();
            if (step == null)
            {
                return NotFound("Step does not exist.");
            }
            _context.Steps.Remove(step);
            _context.SaveChanges();
            return Ok("Step deleted.");
        }

        ///api/file
        [HttpGet]
        public ActionResult<List<Step>> GetAll()
        {
            return _context.Steps.OrderBy(x => x.StepNumber).ToList();
        }

        // /api/file/getstep/id
        [HttpGet("{id}")]
        public ActionResult<Step> GetStep(int id)
        {
            return _context.Steps.Where(x => x.Id == id).FirstOrDefault<Step>();
        }


        [HttpPost]
        [Route("[action]")]
        public IActionResult CreateStep([FromForm] StepModel data)
        {
            try
            {
                Step step = new Step();
                int tmp_DesignId;
                bool success = Int32.TryParse(data.DesignId.ToString(), out tmp_DesignId);
                if (success) step.DesignId = tmp_DesignId;
                if (!success) step.DesignId = 0; // default
            
                step.Title = data.Title;
                step.Body = data.Body;
                step.Video = data.Video;
                step.StepNumber = data.StepNumber;
                
                string path;
                if (data.FormFiles != null) {
                    foreach (var formFile in data.FormFiles)
                    {
                        if (formFile.Length > 0)
                        {
                            path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", formFile.FileName);

                            using (Stream stream = new FileStream(path, FileMode.Create))
                            {
                                formFile.CopyTo(stream);
                            }

                            byte[] fileToBytes = System.IO.File.ReadAllBytes(path);
                            FileModel file = PostFilesToDB(step, fileToBytes, formFile.ContentType, formFile.FileName);
                            _context.Files.Add(file); // IMPORTANT THAT Table gets inserted file row - or else return error: Object reference not set to an instance of an object.
                            step.Files.Add(file);
                        }
                    }
                }
                
                _context.Steps.Add(step);
                _context.SaveChanges();
                
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
            string fileType = fileName; 
            
            fileType = fileType.Substring(fileName.IndexOf('.') + 1); // jpg

            return fileType;
        }

    }
}