using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Contracts.Critical_situations
{
	public class CriticalSituationCreate
	{
		public int EmployeeId { get; set; }
		public DateTime Date { get; set; }
		public bool IsCritical { get; set; }
	}
}
