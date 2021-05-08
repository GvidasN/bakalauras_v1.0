using Hospital_app_02_BE.Domains.Patients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Linq
{
	public interface IForgotPassword
	{
		Task<PatientDto> RemindPassword(string email);
	}
}
