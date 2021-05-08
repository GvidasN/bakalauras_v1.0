using Hospital_app_02_BE.Contracts.Employees;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Linq
{
	public interface IEmployeeRepository
	{
		Task<List<EmployeeDto>> GetAll();
		Task<EmployeeDto> GetById(int id);
		Task<bool> Create(EmployeeDto employeeDto);
		Task<EmployeeDto> Update(EmployeeDto employeeDto, int patientId);
		Task<bool> Delete(int id);
	}
}
