using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Data.Entities
{
	public class Registration
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public DateTime DateTime { get; set; }
		public Employee Employee { get; set; }
		public int EmployeeId { get; set; }
		public Patient Patient { get; set; }
		public int PatientId { get; set; }
		public string DoctorComment { get; set; }
	}
}
