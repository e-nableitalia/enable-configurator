using System.Reflection.PortableExecutable;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Configurator
{
    public class FileModifier
    {
        public static void ForwardNewConfig(string[] args)
        {
           ProcessStartInfo start = new ProcessStartInfo("venv/Scripts/python.exe", "Scripts/test.py");
            
            Console.Write("babajguiguigui");

            start.Arguments = string.Format("{0} {1} {2}", args[0], args[1], args[2]);
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
            Console.Read();
        }
            
            
            
            ///////////////TO SHOW CURRENT DIR 
            /*
            string[] ddd = { "./" };
            foreach (string path in ddd)
            {
                if (File.Exists(path))
                {
                    // This path is a file
                    ProcessFile(path);
                }
                else if (Directory.Exists(path))
                {
                    // This path is a directory
                    ProcessDirectory(path);
                }
                else
                {
                    Console.WriteLine("{0} is not a valid file or directory.", path);
                }



            }



    }
        public static void ProcessDirectory(string targetDirectory)
        {
            // Process the list of files found in the directory.
            string[] fileEntries = Directory.GetFiles(targetDirectory);
            foreach (string fileName in fileEntries)
                ProcessFile(fileName);

            // Recurse into subdirectories of this directory.
            string[] subdirectoryEntries = Directory.GetDirectories(targetDirectory);
            foreach (string subdirectory in subdirectoryEntries)
                ProcessDirectory(subdirectory);
        }

        // Insert logic for processing found files here.
        public static void ProcessFile(string path)
        {
            Console.WriteLine("Processed file '{0}'.", path);
        }
            */

    }

    }