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

        // [HttpGet]
        // public ActionResult<List<FileModel>> GetAllFiles(int id)
        // {
        //     return _context.Files.Where(x => x.StepId == id).ToList();
        // }


        // /api/file/id
        //[HttpGet("{id}", Name = "GetStep")]
        //public IActionResult GetById(int id)
        //{
        //    // returns file
        //    var step = _context.Steps.Find(id);
        //    if (step == null)
        //    {
        //        return NotFound();
        //    }


        //    // save locally (not relevant)
        //    //System.IO.File.WriteAllBytes(step.FilePath, step.File);

        //    return Ok();
        //}

        // //api/file/getFileDataById/id
        // [HttpGet("{id}")]
        // //[Route("[action]")]
        // public IActionResult GetFileDataById(int id)
        // {
        //     var file = _context.Files.FirstOrDefault(x => x.StepId == id);
            
        //     if (file == null)
        //     {
        //         return NotFound();
        //     }
        //     return File(file.FileData, file.FileType);
        //     //return file;
        // }



        [HttpPost]
        public ActionResult Post([FromForm] StepModel data)
        {
            Console.WriteLine("--- Data --- ");
            Console.WriteLine("DesignId: " + data.DesignId);
            Console.WriteLine("Title: " + data.Title);
            Console.WriteLine("Body: " + data.Body);
            Console.WriteLine("Video: " + data.Video);
            Console.WriteLine("FileName: " + data.FileName);
            Console.WriteLine("FileType: " + data.type);

            try
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", data.FileName);

                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    data.FormFile.CopyTo(stream);

                }
                // save online 


                Step step = new Step();
                Console.WriteLine("1. init file...");
                FileModel file = new FileModel();

                byte[] fileToBytes = System.IO.File.ReadAllBytes(path);
                Console.WriteLine("2. input file...");
                //file.Id = _context.Files.Any() ? _context.Files.Max(p => p.Id) + 1 : 1;
                file.StepId = step.Id;
                file.Step = step;
                file.FileData = fileToBytes;
                file.FileType = data.type;

                step.DesignId = data.DesignId;
                step.Title = data.Title;
                step.Body = data.Body;
                step.Video = data.Video;

                _context.Files.Add(file); // IMPORTANT THAT Table gets inserted file row - or else return error: Object reference not set to an instance of an object.

                step.Files.Add(file);

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