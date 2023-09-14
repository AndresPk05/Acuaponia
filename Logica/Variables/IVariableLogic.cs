using CustomTypes;

namespace Logica
{
    public interface IVariableLogic
    {
        Variable Create(VariableRequest request);
        Variable GetVariableById(string IdVariable);
        Variable GetVariableCompletaByName(string name);
        List<Variable> GetVariablesCreadas();
    }
}