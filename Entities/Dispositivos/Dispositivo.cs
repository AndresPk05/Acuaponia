namespace Entities
{
    public class Dispositivo
    {
        public Guid IdDispositivo { get; set; }
        public string Nombre { get; set; }
        public DateTime FechaInscripcion { get; set; }
        public string Token { get; set; }
        public List<LecturaSensor> Lecturas { get; set; }
    }
}
