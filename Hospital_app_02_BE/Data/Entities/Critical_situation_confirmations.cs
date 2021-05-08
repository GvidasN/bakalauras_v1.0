using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Data.Entities
{
	public class Critical_situation_confirmations
	{
		public int Id { get; set; }
		public Employee Employee { get; set; }
		public int EmployeeId { get; set; }
		public DateTime Date { get; set; }
		public bool IsCritical { get; set; }
	}
}
