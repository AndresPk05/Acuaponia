using CustomTypes;
using Logica.Transversales;
using Repository;
using Seguridad;

namespace Logica
{
    public class DispositivoLogic : IDispositivoLogic
    {
        private readonly IDispositivoRepository _repository;
        public DispositivoLogic(IDispositivoRepository repository)
        {
            _repository = repository;
        }
        public List<DispositivoGrid> GetDispositivos()
        {
            try
            {
                var dispositivos = _repository.GetAll();
                return dispositivos.Result.Select(x => new DispositivoGrid
                {
                    id = x.IdDispositivo,
                    nombre = x.Nombre, 
                    fechaInscripcion = x.FechaInscripcion }).ToList();
            }
            catch (Exception ex)
            {

                Logger.WirteLog("DispositivoLogic.GetDispositivos", ex.Message, Serilog.Events.LogEventLevel.Error);
                return null;
            }
        }

        public Dispositivo CreateDispositivo(DispositivoRequest dispositivo)
        {
            try
            {
                var dispositivoCreate = new Dispositivo { Nombre = dispositivo.Nombre };
                var existDispositivoName = _repository.ExistDispositivoByName(dispositivo.Nombre);
                if (existDispositivoName)
                    throw new ManejadorErrores(System.Net.HttpStatusCode.BadRequest, "El Dispositivo ya esta registrado");
                var idDispositivo = Guid.NewGuid();
                var fechaRegistro = DateTimeColombiaUtc.GetDateTimeUtcColombia();

                dispositivoCreate.IdDispositivo = idDispositivo;
                dispositivoCreate.FechaInscripcion = fechaRegistro;
                dispositivoCreate.Token = new SeguridadToken<User>().CrearToken(new User { Name = dispositivo.Nombre }, true);
                
                var resultCreate = _repository.Create(dispositivoCreate);
                
                if(!resultCreate) throw new ManejadorErrores(System.Net.HttpStatusCode.InternalServerError, "Error al insertar Dispositivo");
                
                return dispositivoCreate;
            }
            catch (Exception ex)
            {
                Logger.WirteLog("DispositivoLogic.CreateDispositivo", ex.Message, Serilog.Events.LogEventLevel.Error);
                throw new ManejadorErrores(System.Net.HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}
