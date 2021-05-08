using Hospital_app_02_BE.Contracts.Employees;
using Hospital_app_02_BE.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Contracts.Critical_situations
{
	public class CriticalSituationDto
	{
		public int Id { get; set; }
		public EmployeeDto Employee { get; set; }
		public int EmployeeId { get; set; }
		public DateTime Date { get; set; }
		public bool IsCritical { get; set; }
	}
}
