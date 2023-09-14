using Entities;
using Microsoft.AspNetCore.Identity;

namespace Model
{
    public class DataPrueba
    {
        public static async Task InsertData(AcuoponiDb context, UserManager<Usuario> userManager)
        {
            if (!userManager.Users.Any())
            {
                var entityUser = new Usuario
                {
                    NombreCompleto = "Andres Felipe Parrado",
                    UserName = "AdminSuper",
                    Email = "parrado.andresb@gmail.com"
                };
                await userManager.CreateAsync(entityUser, "UniAgus2022**$");
            }
        } 
    }
}
