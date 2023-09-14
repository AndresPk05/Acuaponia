using Entities;

namespace Repository
{
    public interface IDispositivoRepository
    {
        bool Create(CustomTypes.Dispositivo dispositivo);
        bool ExistDispositivoByName(string Name);
        Task<List<Dispositivo>> GetAll();
        List<CustomTypes.Dispositivo> GetDispositivosSinRegistrosRecientes(IList<Guid> idsDispositivos);
    }
}