using Logica;
using Newtonsoft.Json;
using System.Net;

namespace Acuoponia.WebApi.Middleware
{
    public class ManejadorErrorMiddleware
    {
        private readonly RequestDelegate _requestDelegate;
        private readonly ILogger<ManejadorErrorMiddleware> _logger;
        public ManejadorErrorMiddleware(RequestDelegate requestDelegate, ILogger<ManejadorErrorMiddleware> logger)
        {
            _requestDelegate = requestDelegate;
            _logger = logger;
        }
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _requestDelegate(context);
            }
            catch (Exception ex)
            {

                await ManejadorExcepcionAsincrono(context, ex, _logger);
            }
        }

        private async Task ManejadorExcepcionAsincrono(HttpContext context, Exception ex, ILogger<ManejadorErrorMiddleware> logger)
        {
            object errores = null;
            switch (ex)
            {
                case ManejadorErrores me:
                    logger.LogError(ex, "Manejador Error");
                    errores = me.Errores;
                    context.Response.StatusCode = (int)me.Codigo;
                    break;
                case Exception e:
                    logger.LogError(ex, "Error Servidor");
                    errores = string.IsNullOrWhiteSpace(e.Message) ? "Error" : e.Message;
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    break;
            }
            context.Response.ContentType = "application/json";
            if(errores != null)
            {
                var resultados = JsonConvert.SerializeObject(new { errores });
                await context.Response.WriteAsync(resultados);
            }
        }
    }
}
