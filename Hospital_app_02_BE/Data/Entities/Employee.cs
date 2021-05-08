using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Data.Entities
{
	public class Employee
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Surname { get; set; }
		public string Email { get; set; }
		public string Password { get; set; }
		public string Address { get; set; }
		public string Phone { get; set; }
		public string PersonalCode { get; set; }
		public string Token { get; set; }
		public string EmploymentDate { get; set; }
		public string Role { get; set; }
		public List<Registration> Registrations { get; set; }
		public DateTime BirthDate { get; set; }
	}
}
