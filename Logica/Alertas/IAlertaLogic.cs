using CustomTypes.Alertas;

namespace Logica
{
    public interface IAlertaLogic
    {
        bool InsertAlerta(AlertaRequest request);
    }
}