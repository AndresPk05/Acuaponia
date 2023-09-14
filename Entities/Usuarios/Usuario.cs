using Microsoft.AspNetCore.Identity;

namespace Entities
{
    public class Usuario : IdentityUser 
    {
        public string NombreCompleto { get; set; }
    }
}
