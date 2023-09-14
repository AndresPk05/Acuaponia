using Entities.Alertas;

namespace Entities
{
    public class Alerta
    {
        public Guid IdAlerta { get; set; }
        public string Nombre { get; set; }
        public string EmailNotificacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public Guid IdUsuario { get; set; }
        public List<AlertaConfiguracion> configuraciones { get; set; }
    }
}
