using CustomTypes;

namespace Logica
{
    public interface IDispositivoLogic
    {
        Dispositivo CreateDispositivo(DispositivoRequest dispositivo);
        List<DispositivoGrid> GetDispositivos();
    }
}