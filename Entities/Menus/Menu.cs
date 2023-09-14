using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Menu
{
    public class Menu
    {
        public Guid Id_Menu { get; set; }
        public string Descripcion { get; set; }
        public string Path { get; set; }
        public string Titulo { get; set; }
        public Guid Id_ICons { get; set; }
        public ICons Icono { get; set; }
    }
}
