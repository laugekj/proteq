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

        [HttpGet]
        public ActionResult<List<FileModel>> GetAllFiles(int id)
        {
            return _context.Files.Where(x => x.StepId == id).ToList();
        }

        //api/file/getFileDataById/id
        [HttpGet("{id}")]
        //[Route("[action]")]
        public IActionResult GetFileDataById(int id)
        {
            var file = _context.Files.FirstOrDefault(x => x.StepId == id);
            var v =  _context.Steps.ToList();
            if (file == null)
            {
                return NotFound();
            }
            return File(file.FileData, file.FileType);
            //return file;
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
                        file.FileName = formFile.FileName;
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

        /*[HttpPost]
        [Route("[action]")]
        public ActionResult uploadFile(StepModel data) 
        { 
            Console.WriteLine("[DEVELOPER MODE] Backend uploadFile() called");
            Console.WriteLine("[# DesignId] " + data.DesignId);
            Console.WriteLine("[# Title] " + data.Title);
            Console.WriteLine("[# Body] " + data.Body);
            Console.WriteLine("[# Video] " + data.Video);
            //Console.WriteLine("[# File] " + data.file);

            _context.Steps.Add(new Step() {
                DesignId = data.DesignId,
                Title = data.Title,
                Body = data.Body,
                Video = data.Video

            });

            _context.SaveChanges();

            return Accepted();
        }*/





        private string getFileType(string fileName)
        {
            string fileType = fileName; // XXXX.jpg
            fileType = fileType.Substring(fileName.IndexOf('.') + 1); // jpg

            return fileType;
        }

    }
}