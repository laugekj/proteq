using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using test.Models;

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


    [HttpPost]
    public ActionResult Post([FromForm] FileModel file)
    {
        try
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", file.FileName);

            using (Stream stream = new FileStream(path, FileMode.Create))
            {
                file.FormFile.CopyTo(stream);

            }
                // save online 
                Step step = new Step();
                byte[] fileToBytes = System.IO.File.ReadAllBytes(path);
                step.Image = fileToBytes;
                _context.Steps.Add(step);
                _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    }
}