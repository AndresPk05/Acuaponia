using CustomTypes;

namespace Logica.TareasAsincronas
{
    public interface ITareasLogic
    {
        void EjecutarTareasPrincipal();
        List<Dispositivo> GetDispositivosSinRegistros();
    }
}