using Entities.Alertas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Variable
    {
        public Guid Id_Variable { get; set; }
        public string Nombre { get; set; }
        public DateTime Fecha_Registro { get; set; }
        public decimal MaximoValor { get; set; }
        public List<LecturaSensor> Lecturas { get; set; }
        public ICollection<AlertaConfiguracion> configuraciones { get; set; }
    }
}
