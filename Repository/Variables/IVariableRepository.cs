using CustomTypes;

namespace Repository
{
    public interface IVariableRepository
    {
        bool Create(Variable variable);
        bool ExistVariableWithName(string Name);
        Variable GetVariableById(Guid IdVariable);
        Guid GetVariableByName(string name);
        CustomTypes.Variable GetVariableCompletaByName(string name);
        List<Variable> GetVariablesRegistradas();
    }
}