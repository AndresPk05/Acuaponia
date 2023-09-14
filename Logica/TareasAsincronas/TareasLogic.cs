using CustomTypes;
using CustomTypes.Alertas;
using Logica.Transversales;
using Microsoft.EntityFrameworkCore;
using Model;
using Repository;
using Repository.Alertas;
using Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logica.TareasAsincronas;

public class TareasLogic : ITareasLogic
{
    private IDispositivoRepository _dispositivoRepository;
    private ILecturaSensorRepository _lecturaRepository;
    private ISendEmail _sendEmail;
    private IAletaConfiguracionRepository _aletaConfiguracionRepository;

    private new Dictionary<string, string> _condicionales;
    public TareasLogic(IDispositivoRepository dispositivoRepository, ILecturaSensorRepository lecturaRepository, ISendEmail sendEmail, IAletaConfiguracionRepository aletaConfiguracionRepository)
    {
        _dispositivoRepository = dispositivoRepository;
        _lecturaRepository = lecturaRepository;
        _sendEmail = sendEmail;
        _aletaConfiguracionRepository = aletaConfiguracionRepository;
        _condicionales = new Dictionary<string, string>{
            { "MAYOR", ">"},
            { "IGUAL", "="},
            { "MAYORIGUAL", ">="},
            { "MENOR", "<"},
            { "MENORIGUAL", "<="},
        };
    }
    public void EjecutarTareasPrincipal()
    {
        //Se valida si hay dispositivos registrados sin datos recientes
        var dispositivosSinRegistros = GetDispositivosSinRegistros();
        if (dispositivosSinRegistros.Any())
        {
            var mensajeCorreo = @"Los siguientes dispositivos no han enviado información en los últimos 15 minutos.  </br> 
                                    Dispositivos:
                                    ";
            var dispotivos = "";
            dispositivosSinRegistros.ForEach(x => dispotivos += $"Nombre Dipositivo: {x.Nombre}  </br> ");
            mensajeCorreo += dispotivos;
            _sendEmail.SendEmailAlerta(mensajeCorreo, "caotic005@hotmail.com");
        }

        GetDispositivosCumplenAlertas();
    }

    public List<Dispositivo> GetDispositivosSinRegistros()
    {
        try
        {
            var fechaBuscar = DateTimeColombiaUtc.GetDateTimeUtcColombia().AddMinutes(-17);
            var dispositivosConRegistrosRecientes = _lecturaRepository.GetDispositivosConRegistrosRecientes(fechaBuscar);
            if (!dispositivosConRegistrosRecientes.Any())
            {
                var dispostivosRegistrados = _dispositivoRepository.GetAll().Result;
                return dispostivosRegistrados.Select(x => new Dispositivo { Nombre = x.Nombre }).ToList();
            }
            var dispositivosSinRegistrosRecientes = _dispositivoRepository.GetDispositivosSinRegistrosRecientes(dispositivosConRegistrosRecientes.Select(x => x.IdDispositivo).ToList());
            return dispositivosSinRegistrosRecientes;
        }
        catch (Exception ex)
        {
            Logger.WirteLog("Logica.TareasLogic.GetDispositivosSinRegistros", ex.Message, Serilog.Events.LogEventLevel.Error);
            return null;
        }
    }

    private void GetDispositivosCumplenAlertas()
    {
        try
        {
            var alertasConfiguradas = _aletaConfiguracionRepository.GetAlertasConfiguradas();
            foreach (var alerta in alertasConfiguradas)
            {
               var dispositivos = ValidarAlertaConfigurada(alerta);
                if (dispositivos.Any())
                {
                    var mensajeCorreo = @"Los siguientes dispositivos presentan problamas. </br> 
                                    Dispositivos:
                                    ";
                    var dispotivos = "";
                    dispositivos.ForEach(x => dispotivos += $"Nombre Dipositivo: {x.Nombre} {Environment.NewLine}");
                    mensajeCorreo += dispotivos;
                    _sendEmail.SendEmailAlerta(mensajeCorreo, "caotic005@hotmail.com");
                }
            }
        }
        catch (Exception)
        {

            throw;
        }
    }

    private List<Dispositivo> ValidarAlertaConfigurada(Alerta alerta)
    {
        try
        {
            var fechaBuscar = DateTimeColombiaUtc.GetDateTimeUtcColombia().AddMinutes(-17);
            var query = $@"SELECT public.""Dispositivos"".""Nombre"",
                            public.""Dispositivos"".""IdDispositivo"",
                            COUNT(public.""Dispositivos"".""Nombre"") as CantidadLecturaLumbral
                            FROM public.""Dispositivos""
                            LEFT JOIN public.""LecturaSensores""
                            ON public.""Dispositivos"".""IdDispositivo"" = public.""LecturaSensores"".""IdDispositivo""
                            WHERE [Condicion]
                            GROUP BY public.""Dispositivos"".""Nombre"",
                            public.""Dispositivos"".""IdDispositivo""";
            var condicion = "";
            foreach (var configuracion in alerta.configuraciones)
            {
                var caracterCondicion = "";
                var condicional = _condicionales.TryGetValue(configuracion.Condicion, out caracterCondicion);
                condicion += $@" public.""LecturaSensores"".""Valor_Lectura"" {caracterCondicion} '{configuracion.ValorLumbral}'
                                 AND public.""LecturaSensores"".""IdVariable"" = '{configuracion.Variable.Id_Variable}' AND";


            }

            condicion = condicion.Substring(0, condicion.Length - 3);
            condicion += @$" AND public.""LecturaSensores"".""FechaLectura"" >= '{fechaBuscar.ToString("dd-MM-yyyy hh:mm")}'";
            query = query.Replace("[Condicion]", condicion);
            var dispostivosValidos = _lecturaRepository.GetDispositivosConAlertas(query);
            return dispostivosValidos;
        }
        catch (Exception)
        {

            return null;
        }
    }
}
