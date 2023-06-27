using Configurator.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Configurator.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {/*
            
            ProcessStartInfo start = new ProcessStartInfo("venv/bin/python3", "Scripts/test.py");

            //start.FileName = "venv/bin/python";
            Console.Write("babajguiguigui");

            //start.Arguments = string.Format("{0} {1} {2}", "", "","");
            start.UseShellExecute = false;
            start.RedirectStandardOutput = true;
            using (Process process = Process.Start(start))
            {
                using (StreamReader reader = process.StandardOutput)
                {
                    string result = reader.ReadToEnd();
                    // this prints 11
                    Console.Write(result);

                }
            }
            */

            //Console.Write( Directory.GetDirectories("../"));
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }



        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}