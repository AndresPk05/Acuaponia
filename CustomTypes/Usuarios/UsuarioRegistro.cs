using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomTypes
{
    public class UsuarioRegistro
    {
        private string nombreCompleto;

        public string NombreCompleto
        {
            get { return nombreCompleto; }
            set { nombreCompleto = Nombre + Apellido; }
        }

        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}
