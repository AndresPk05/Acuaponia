using CustomTypes;
using CustomTypes.Lecturas;

namespace Logica
{
    public interface ILecturaSensorLogic
    {
        List<Guid> GetIdVariablesByDispositivo(Guid IdDispositivo);
        LecturaSensorResponse GetLecturasByDispostivoFechaVariable(LecturaSensorRequest request);
        LecturaSensorResponse GetLecturaSensor(LecturaSensorRequest request);
        decimal GetMaximoValorByVariableDispostivo(LecturaMaximaRequest request);
        void InsertLecturaSensores(InsertLecturaRequest lectura);
    }
}