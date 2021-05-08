using Hospital_app_02_BE.Contracts.Employees;
using Hospital_app_02_BE.Contracts.Patients;
using Hospital_app_02_BE.Data.Entities;
using Hospital_app_02_BE.Domains.Patients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Contracts.Registrations
{
	public class RegistrationView
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public DateTime DateTime { get; set; }
		public EmployeeRegistrationDto Employee { get; set; }
		public PatientRegistrationDto Patient { get; set; }
		public string DoctorComment { get; set; }
	}
}
