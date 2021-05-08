using Hospital_app_02_BE.Contracts.Patients;
using Hospital_app_02_BE.Data;
using Hospital_app_02_BE.Domains.Patients;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Linq
{
	public class ForgotPassword : IForgotPassword
	{
		private readonly HospitalContext _context;
		public ForgotPassword(HospitalContext context)
		{
			_context = context;
		}

		public async Task<PatientDto> RemindPassword(string email)
		{
			return await _context.Patients
				.Where(x => x.Email == email)
				.Select(x => x.ToDto())
				.SingleOrDefaultAsync();
		}
	}
}
