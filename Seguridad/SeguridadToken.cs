using CustomTypes;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Seguridad
{
    public class SeguridadToken<T> : ISeguridad<T> where T : IToken
    {
        public string CrearToken(T dataToken, bool senDispositivo)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, dataToken.Name)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("4cu0p0ni422**Uni$$"));
            var credenciales = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescripcion = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = senDispositivo ? DateTime.Now.AddYears(10) : DateTime.Now.AddDays(1),
                SigningCredentials = credenciales
            };

            var tokenManejador = new JwtSecurityTokenHandler();
            var token = tokenManejador.CreateToken(tokenDescripcion);

            var tokenGenerado = tokenManejador.WriteToken(token);

            return tokenGenerado;
        }
    }
}
