using System.Net;

namespace Logica
{
    public class ManejadorErrores : Exception
    {
        public HttpStatusCode Codigo { get; set; }
        public object Errores { get; set; }

        public ManejadorErrores(HttpStatusCode codigo, object errores = null)
        {
            Codigo = codigo;
            Errores = errores;
        }
    }
}
