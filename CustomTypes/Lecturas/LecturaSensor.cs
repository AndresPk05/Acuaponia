namespace CustomTypes
{
    public class LecturaSensor
    {
        public Guid Id { get; set; }
        public DateTime FechaLectura { get; set; }
        public decimal Valor_Leido { get; set; }
        public Guid IdDispositivo { get; set; }
        public Guid IdVariable { get;set; }
    }
}
