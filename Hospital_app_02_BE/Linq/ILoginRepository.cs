using Hospital_app_02_BE.Contracts.Login;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Linq
{
	public interface ILoginRepository
	{
		Task<bool> Authenticate(LoginRequest user);
		string CreateToken(LoginRequest user);
		Task<LoginResponse> CreateResponse(LoginRequest user, string token);
	}
}
