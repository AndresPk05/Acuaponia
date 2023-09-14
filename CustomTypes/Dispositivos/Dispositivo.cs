namespace CustomTypes
{
    public class Dispositivo : IToken
    {
        public Guid IdDispositivo { get; set; }
        public string Nombre { get; set; }
        public DateTime FechaInscripcion { get; set; }

        public string Token { get; set; }

        private string name;

        public string Name
        {
            get { return name; }
            set { name = Nombre; }
        }

        public int? CantidadLecturaLumbral { get; set; }
    }
}
