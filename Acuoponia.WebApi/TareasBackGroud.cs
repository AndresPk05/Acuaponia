using Hangfire;
using Logica.TareasAsincronas;
using Repository;
using Resources;

namespace Acuoponia.WebApi
{
    public class TareasBackGroud : BackgroundService
    {
        private readonly IServiceScopeFactory _serviceScopeFactory1;
        public TareasBackGroud(IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScopeFactory1 = serviceScopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _serviceScopeFactory1.CreateScope())
                {
                    var scopeServices = scope.ServiceProvider.GetRequiredService<ITareasLogic>();
                    scopeServices.EjecutarTareasPrincipal();
                    await Task.Delay(TimeSpan.FromMinutes(15));
                }

            }
        }
    }
}
