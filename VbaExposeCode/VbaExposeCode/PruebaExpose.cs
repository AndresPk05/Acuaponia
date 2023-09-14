using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VbaExposeCode
{
    [System.Runtime.InteropServices.ComVisible(true)]
    [System.Runtime.InteropServices.ClassInterface(
    System.Runtime.InteropServices.ClassInterfaceType.None)]
    public class PruebaExpose : IPruebaExpose
    {
        public void ImprimirTexto(string mensaje)
        {
            var pathApp = Directory.GetCurrentDirectory();
            File.WriteAllText($"{pathApp}/log.txt", mensaje);
        }
    }
}
