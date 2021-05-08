using Hospital_app_02_BE.Contracts.Registrations;
using Hospital_app_02_BE.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Contracts.Employees
{
	public static class EmployeeExtensions
	{
		public static EmployeeView ToView(this EmployeeDto employeeDto)
		{
			return new EmployeeView()
			{
				Id = employeeDto.Id,
				Name = employeeDto.Name,
				Surname = employeeDto.Surname,
				Email = employeeDto.Email,
				Password = employeeDto.Password,
				Address = employeeDto.Address,
				Phone = employeeDto.Phone,
				PersonalCode = employeeDto.PersonalCode,
				EmploymentDate = employeeDto.EmploymentDate,
				Role = employeeDto.Role,
				BirthDate = employeeDto.BirthDate,
				Registrations = employeeDto.Registrations is null ? new List<RegistrationDto>() : employeeDto.Registrations
			};
		}

		public static EmployeeDto ToDto(this Employee employee)
		{
			return new EmployeeDto()
			{
				Id = employee.Id,
				Name = employee.Name,
				Surname = employee.Surname,
				Email = employee.Email,
				Password = employee.Password,
				Address = employee.Address,
				Phone = employee.Phone,
				PersonalCode = employee.PersonalCode,
				EmploymentDate = employee.EmploymentDate,
				Role = employee.Role,
				BirthDate = employee.BirthDate,
				Registrations = employee.Registrations is null ? new List<RegistrationDto>() : employee.Registrations
					.Select(x => new RegistrationDto()
					{
						Id = x.Id,
						Title = x.Title,
						DateTime = x.DateTime,
						Description = x.Description,
						EmployeeId = x.EmployeeId,
						PatientId = x.PatientId
					}).ToList()
			};
		}

		public static EmployeeDto ToDto(this EmployeeCreate employee)
		{
			return new EmployeeDto()
			{
				Name = employee.Name,
				Surname = employee.Surname,
				Email = employee.Email,
				Password = employee.Password,
				Address = employee.Address,
				Phone = employee.Phone,
				PersonalCode = employee.PersonalCode,
				EmploymentDate = employee.EmploymentDate,
				Role = employee.Role,
				BirthDate = employee.BirthDate,
				Registrations = new List<RegistrationDto>()
			};
		}

		public static EmployeeDto ToDto(this EmployeeUpdate employee)
		{
			return new EmployeeDto()
			{
				Id = employee.Id,
				Name = employee.Name,
				Surname = employee.Surname,
				Email = employee.Email,
				Password = employee.Password,
				Address = employee.Address,
				Phone = employee.Phone,
				PersonalCode = employee.PersonalCode,
				EmploymentDate = employee.EmploymentDate,
				Role = employee.Role,
				BirthDate = employee.BirthDate,
				Registrations = employee.Registrations ?? new List<RegistrationDto>() 
			};
		}

		public static EmployeeRegistrationDto ToRegistrationDto(this EmployeeDto employee)
		{
			return new EmployeeRegistrationDto()
			{
				Id = employee.Id,
				Name = employee.Name,
				Surname = employee.Surname,
				Email = employee.Email,
				Password = employee.Password,
				Address = employee.Address,
				Phone = employee.Phone,
				PersonalCode = employee.PersonalCode,
				EmploymentDate = employee.EmploymentDate,
				Role = employee.Role,
				BirthDate = employee.BirthDate,
			};
		}

		public static Employee ToEntity(this EmployeeDto employeeDto)
		{
			return new Employee()
			{
				Name = employeeDto.Name,
				Surname = employeeDto.Surname,
				Email = employeeDto.Email,
				Password = employeeDto.Password,
				Address = employeeDto.Address,
				Phone = employeeDto.Phone,
				PersonalCode = employeeDto.PersonalCode,
				EmploymentDate = employeeDto.EmploymentDate,
				Role = employeeDto.Role,
				BirthDate = employeeDto.BirthDate,
				Registrations = employeeDto.Registrations is null ? new List<Registration>() : employeeDto.Registrations
					.Select(x => new Registration()
					{
						Id = x.Id,
						Title = x.Title,
						DateTime = x.DateTime,
						Description = x.Description,
						EmployeeId = x.EmployeeId,
						PatientId = x.PatientId
					}).ToList()
			};
		}
	}
}
