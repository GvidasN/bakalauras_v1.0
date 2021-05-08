using Hospital_app_02_BE.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Contracts.Registrations
{
	public class RegistrationCreate
	{
		public string Title { get; set; }
		public string Description { get; set; }
		public DateTime DateTime { get; set; }
		public int EmployeeId { get; set; }
		public int PatientId { get; set; }
		//public Employee Employee { get; set; }
		//public Patient Patient { get; set; }
	}
}
