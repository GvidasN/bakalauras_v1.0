using Hospital_app_02_BE.Contracts.Employees;
using Hospital_app_02_BE.Data.Entities;
using Hospital_app_02_BE.Domains.Patients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Contracts.Registrations
{
	public class RegistrationDto
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public DateTime DateTime { get; set; }
		public EmployeeDto Employee { get; set; }
		public PatientDto Patient { get; set; }
		public int EmployeeId { get; set; }
		public int PatientId { get; set; }
		public string DoctorComment { get; set; }
	}
}
