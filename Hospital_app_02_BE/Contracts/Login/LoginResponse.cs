using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Contracts.Login
{
	public class LoginResponse
	{
		public int Id { get; set; }
		public string Role { get; set; }
		public string Token { get; set; }
		public int RiskLevel { get; set; }
	}
}
