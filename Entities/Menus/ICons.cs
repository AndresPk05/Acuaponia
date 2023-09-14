using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Menu
{
    public class ICons
    {
        public Guid Id_ICons { get; set; }
        public string Name { get; set; }
        public ICollection<Menu> Menus { get; set; }
    }
}
