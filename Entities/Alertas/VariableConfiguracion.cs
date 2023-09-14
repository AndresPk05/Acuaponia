using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Alertas
{
    public class VariableConfiguracion
    {
        public Guid Id_Variable { get; set; }
        public Variable Variable { get; set; }
        public Guid Id_AlertaConfiguracion { get; set; }
        public List<AlertaConfiguracion> AlertaConfiguraciones { get; set; }
    }
}
