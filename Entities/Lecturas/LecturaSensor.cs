namespace Entities
{
    public class LecturaSensor
    {
        public Guid IdLecturaSensor { get; set; }
        public DateTime FechaLectura { get; set; }
        public decimal Valor_Lectura { get; set; }
        public Guid IdVariable { get; set; }
        public Variable variable { get; set; }
        public Guid IdDispositivo { get; set; }
        public Dispositivo dispositivo { get; set; }

    }
}
