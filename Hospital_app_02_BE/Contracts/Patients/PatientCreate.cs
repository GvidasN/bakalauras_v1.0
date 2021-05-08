using Hospital_app_02_BE.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Contracts.Patients
{
	public class PatientCreate
	{
		public string Name { get; set; }
		public string Surname { get; set; }
		public string Email { get; set; }
		public string Password { get; set; }
		public string Address { get; set; }
		public string Phone { get; set; }
		public string PersonalCode { get; set; }
		public int RiskLevel { get; set; }
		public DateTime BirthDate { get; set; }
	}
}
