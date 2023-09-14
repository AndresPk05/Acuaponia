using CustomTypes.Alertas;

namespace Repository.Alertas
{
    public interface IAlertaRepository
    {
        bool InsertAlerta(Alerta alerta);
    }
}