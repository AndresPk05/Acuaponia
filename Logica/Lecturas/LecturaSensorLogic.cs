using CustomTypes;
using CustomTypes.Lecturas;
using Logica.Transversales;
using Repository;

namespace Logica
{
    public class LecturaSensorLogic : ILecturaSensorLogic
    {
        private readonly ILecturaSensorRepository _lecturaSensorRepository;
        public LecturaSensorLogic(ILecturaSensorRepository lecturaSensorRepository)
        {
            _lecturaSensorRepository = lecturaSensorRepository;
        }
        public void InsertLecturaSensores(InsertLecturaRequest lectura)
        {
            try
            {
                var idLectura = new Guid();
                var fechaRegistro = DateTimeColombiaUtc.GetDateTimeUtcColombia();
                var lecturaInsert = new LecturaSensor
                {
                    Id = idLectura,
                    FechaLectura = fechaRegistro,
                    Valor_Leido = lectura.ValorLeido,
                    IdDispositivo = lectura.IdDispositivo,
                    IdVariable = lectura.IdVariable
                };

                _lecturaSensorRepository.InsertLecturaSensor(lecturaInsert);
            }
            catch (Exception ex)
            {

                new ManejadorErrores(System.Net.HttpStatusCode.InternalServerError, ex);
            }
        }

        public LecturaSensorResponse GetLecturaSensor(LecturaSensorRequest request)
        {
            try
            {
                var idDispositivo = new Guid(request.IdDispositivo);
                var result = _lecturaSensorRepository.GetLecturasByDispostivoAndFecha(idDispositivo, request);
                if (result == null) throw new ManejadorErrores(System.Net.HttpStatusCode.NotFound);
                var resultLectarasResponse = new LecturaSensorResponse
                {
                    Lecturas = result,
                    PageCount = request.PageCount,
                    PageSize = request.PageSize,
                    RowCount = request.RowCount
                };
                return resultLectarasResponse;
            }
            catch (Exception ex)
            {

                throw new ManejadorErrores(System.Net.HttpStatusCode.InternalServerError, ex);
            }
        }

        public LecturaSensorResponse GetLecturasByDispostivoFechaVariable(LecturaSensorRequest request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.IdVariable) || string.IsNullOrEmpty(request.IdDispositivo))
                    return new LecturaSensorResponse();
                var idDispositivo = new Guid(request.IdDispositivo);
                var idVariable = Guid.Parse(request.IdVariable);
                var result = _lecturaSensorRepository.GetLecturasByDispostivoFechaVariable(idDispositivo, request, idVariable);
                if (result == null) throw new ManejadorErrores(System.Net.HttpStatusCode.NotFound);
                var resultLectarasResponse = new LecturaSensorResponse
                {
                    Lecturas = result
                };
                return resultLectarasResponse;
            }
            catch (Exception ex)
            {

                throw new ManejadorErrores(System.Net.HttpStatusCode.InternalServerError, ex);
            }
        }

        public decimal GetMaximoValorByVariableDispostivo(LecturaMaximaRequest request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.IdVariable) || string.IsNullOrEmpty(request.IdDispositivo))
                    return 0;
                var fechaBuscar = DateTimeColombiaUtc.GetDateTimeUtcColombia();
                var guidVariable = Guid.Parse(request.IdVariable);
                var guidDispostivo = Guid.Parse(request.IdDispositivo);
                var valorMaximo = _lecturaSensorRepository.GetMaximoValorByVariableDispostivo(guidDispostivo, guidVariable, fechaBuscar);
                return valorMaximo;
            }
            catch (Exception ex)
            {
                Logger.WirteLog("Logica.LecturaSensorLogic.GetMaximoValorByVariableDispostivo", ex.Message, Serilog.Events.LogEventLevel.Error);
                throw new ManejadorErrores(System.Net.HttpStatusCode.InternalServerError, ex);
            }
        }

        public List<Guid> GetIdVariablesByDispositivo(Guid IdDispositivo)
        {
            try
            {
                var variables = _lecturaSensorRepository.GetIdVariablesByDispositivo(IdDispositivo);
                return variables;
            }
            catch (Exception ex)
            {

                Logger.WirteLog("Logica.LecturaSensorLogic.GetIdVariablesByDispositivo", ex.Message, Serilog.Events.LogEventLevel.Error);
                throw new ManejadorErrores(System.Net.HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}
