using CustomTypes;

namespace Repository
{
    public interface ILecturaSensorRepository
    {
        void InsertLecturaSensor(LecturaSensor lecturaSensor);
        List<LecturaSensor> GetLecturasByDispostivoAndFecha(Guid IdDispostivo, LecturaSensorRequest request);
        List<Dispositivo> GetDispositivosConRegistrosRecientes(DateTime fecha);
        List<Dispositivo> GetDispositivosConAlertas(string query);
        decimal GetMaximoValorByVariableDispostivo(Guid IdDispositivo, Guid IdVariable, DateTime FechaBuscar);
        List<LecturaSensor> GetLecturasByDispostivoFechaVariable(Guid IdDispostivo, LecturaSensorRequest request, Guid IdVariable);
        List<Guid> GetIdVariablesByDispositivo(Guid IdDispositivo);
    }
}