using Hospital_app_02_BE.Contracts.Login;
using Hospital_app_02_BE.Data;
using Hospital_app_02_BE.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Linq
{
	public class LoginRepository : ILoginRepository
	{
		private readonly HospitalContext _context;
		public LoginRepository(HospitalContext context)
		{
			_context = context;
		}


		public async Task<bool> Authenticate(LoginRequest user)
		{
			var employeeEntity = await _context.Employees.SingleOrDefaultAsync(x => x.Email == user.Email && x.Password == user.Password);
			var patientEntity = await _context.Patients.SingleOrDefaultAsync(x => x.Email == user.Email && x.Password == user.Password);

			if (employeeEntity is null && patientEntity is null)
				return false;

			return true;
		}

		public string CreateToken(LoginRequest request)
		{
			if (request is null) return string.Empty;

			return JwtProvider.CreateToken(request);
		}

		public async Task<LoginResponse> CreateResponse(LoginRequest user, string token)
		{
			int id = 0;
			string role;
			int riskLevel = 0;

			var patientUser = await _context.Patients.SingleOrDefaultAsync(x => x.Email == user.Email && x.Password == user.Password);
			var employeeUser = await _context.Employees.SingleOrDefaultAsync(x => x.Email == user.Email && x.Password == user.Password);

			if (patientUser != null)
			{
				id = patientUser.Id;
				role = "";
				riskLevel = patientUser.RiskLevel;
			}
				
			else
			{
				id = employeeUser.Id;
				role = employeeUser.Role;
			}
				

			return new LoginResponse()
			{
				Id = id,
				Token = token,
				Role = role,
				RiskLevel = riskLevel
			};
		}
	}
}
