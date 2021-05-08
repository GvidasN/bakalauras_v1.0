using Hospital_app_02_BE.Contracts.Login;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Helpers
{
	public static class JwtProvider
	{
        public static string CreateToken(LoginRequest user)
        {            
            var utcNow = DateTime.UtcNow;

            var claims = new Claim[] {
                new Claim(JwtRegisteredClaimNames.Iat, utcNow.ToString()),
                new Claim("Email", user.Email)
            };

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YOUR SPECIAL SECRET USED TO VERIFY JWT TOKENS, CAN BE ANY STRING!"));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(
                signingCredentials: signingCredentials,
                claims: claims,
                expires: utcNow.AddHours(1)
            );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
