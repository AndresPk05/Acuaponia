namespace CustomTypes
{
    public class LecturaSensorRequest
    {
        public string IdDispositivo { get; set; }
        public string IdVariable { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFinal { get; set; }
        public int PageCount { get; set; }
        public int PageSize { get; set; }
        public int RowCount { get; set; }
    }
}
