using Hospital_app_02_BE.Contracts.Employees;
using Hospital_app_02_BE.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Linq
{
	public class EmployeeRepository : IEmployeeRepository
	{
		readonly HospitalContext _context;

		public EmployeeRepository(HospitalContext context)
		{
			_context = context;
		}

		public async Task<List<EmployeeDto>> GetAll()
		{
			return await _context.Employees
				.Include(x => x.Registrations)
				.Select(x => x.ToDto())
				.ToListAsync();
		}

		public async Task<EmployeeDto> GetById(int id)
		{
			return await _context.Employees
				.Where(x => x.Id == id)
				.Include(x => x.Registrations)
				.Select(x => x.ToDto())
				.SingleOrDefaultAsync();
		}

		public async Task<bool> Create(EmployeeDto employeeDto)
		{
			var entity = employeeDto.ToEntity();
			_context.Employees.Add(entity);
			_context.Registrations.AddRange(entity.Registrations);
			await _context.SaveChangesAsync();
			return true;
		}

		public async Task<EmployeeDto> Update(EmployeeDto employeeDto, int employeeId)
		{
			var entity = await _context.Employees.SingleOrDefaultAsync(x => x.Id == employeeId);
			if (entity == null) return null;

			entity.Name = employeeDto.Name ?? entity.Name;
			entity.Surname = employeeDto.Surname ?? entity.Surname;
			entity.Email = employeeDto.Email ?? entity.Email;
			entity.Password = employeeDto.Password ?? entity.Password;
			entity.Phone = employeeDto.Phone ?? entity.Phone;
			entity.Address = employeeDto.Address ?? entity.Address;
			entity.PersonalCode = employeeDto.PersonalCode ?? entity.PersonalCode;
			entity.EmploymentDate = employeeDto.EmploymentDate ?? entity.EmploymentDate;
			entity.Role = employeeDto.Role ?? entity.Role;

			_context.Employees.Update(entity);
			await _context.SaveChangesAsync();
			return await GetById(entity.Id);
		}

		public async Task<bool> Delete(int employeeId)
		{
			var entity = await _context.Employees.SingleOrDefaultAsync(x => x.Id == employeeId);
			if (entity is null) return false;

			_context.Employees.Remove(entity);
			await _context.SaveChangesAsync();
			return true;
		}
	}
}
