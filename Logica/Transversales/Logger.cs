using Serilog;
using Serilog.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logica.Transversales
{
    public static class Logger
    {
        public static void WirteLog(string Metodo, string textoGuardar, LogEventLevel level)
        {
            var logger = new LoggerConfiguration()
                .Enrich.WithProcessId()
                .Enrich.WithProcessName()
                .WriteTo.File($"log{DateTime.Now.ToString("dd-mm-yyyy")}.txt", LogEventLevel.Fatal, rollingInterval: RollingInterval.Day, retainedFileCountLimit: 10)
                .CreateLogger();

            logger.Write(level, $"Metodo Mensaje: {Metodo}");
            logger.Write(level, $"Mensaje: {textoGuardar}");
        }
    }
}
