using CustomTypes;
using Entities;
using Microsoft.AspNetCore.Identity;
using Repository;
using Seguridad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logica
{
    public class RegistrarUsuarioLogic : IRegistrarUsuarioLogic
    {
        private readonly UserManager<Usuario> _userManager;
        private readonly IUsuarioRepository _repository;
        public RegistrarUsuarioLogic(UserManager<Usuario> userManager, IUsuarioRepository repository)
        {
            _userManager = userManager;
            _repository = repository;
        }

        public async Task<UsuarioData> CreateUser(UsuarioRegistro usuario)
        {
            try
            {
                var existUser = _repository.ValidateExistUser(usuario.Email);
                if (existUser) throw new ManejadorErrores(System.Net.HttpStatusCode.BadRequest, new { mensaje = "El usuario ya existe" });

                var userCreate = new Usuario
                {
                    Email = usuario.Email,
                    NombreCompleto = usuario.NombreCompleto,
                    UserName = usuario.Email
                };

                var result = await _userManager.CreateAsync(userCreate, usuario.Password);
                if (result.Succeeded)
                {
                    return new UsuarioData
                    {
                        Email = usuario.Email,
                        Token = new SeguridadToken<User>().CrearToken(new User { Name = userCreate.NombreCompleto }, false),
                        NombreCompleto = userCreate.NombreCompleto
                    };
                }

                throw new ManejadorErrores(System.Net.HttpStatusCode.InternalServerError, new { mensaje = "no fue posible crear el usuario" });
            }
            catch (ManejadorErrores ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {

                throw new ManejadorErrores(System.Net.HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}
