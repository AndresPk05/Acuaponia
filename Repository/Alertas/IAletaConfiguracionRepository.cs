using CustomTypes.Alertas;

namespace Repository.Alertas
{
    public interface IAletaConfiguracionRepository
    {
        List<Alerta> GetAlertasConfiguradas();
        bool InsertAlertaConfiguracionesRange(List<AlertaConfiguracion> alerts);
    }
}