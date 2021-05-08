using Hospital_app_02_BE.Contracts.Employees;
using Hospital_app_02_BE.Contracts.Patients;
using Hospital_app_02_BE.Data.Entities;
using Hospital_app_02_BE.Domains.Patients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Contracts.Registrations
{
	public static class RegistrationExtensions
	{
		public static RegistrationDto ToDto(this Registration registration)
		{
			return new RegistrationDto()
			{
				Id = registration.Id,
				Title = registration.Title,
				DateTime = registration.DateTime,
				Description = registration.Description,
				Employee = registration.Employee is null ? new EmployeeDto() : registration.Employee.ToDto(),
				Patient = registration.Patient is null ? new PatientDto() : registration.Patient.ToDto()
				//EmployeeId = registration.EmployeeId,
				//PatientId = registration.PatientId
			};
		}

		public static RegistrationDto ToDto(this RegistrationCreate registration)
		{
			return new RegistrationDto()
			{
				Title = registration.Title,
				DateTime = registration.DateTime,
				Description = registration.Description,
				EmployeeId = registration.EmployeeId,
				PatientId = registration.PatientId
				//Employee = registration.Employee is null ? new EmployeeDto() : registration.Employee.ToDto(),
				//Patient = registration.Patient is null ? new PatientDto() : registration.Patient.ToDto()
			};
		}

		public static RegistrationDto ToDto(this RegistrationUpdate registration)
		{
			return new RegistrationDto()
			{
				Id = registration.Id,
				Title = registration.Title,
				DateTime = registration.DateTime,
				Description = registration.Description,
				EmployeeId = registration.EmployeeId,
				PatientId = registration.PatientId,
				DoctorComment = registration.DoctorComment
				//Employee = registration.Employee is null ? new EmployeeDto() : registration.Employee.ToDto(),
				//Patient = registration.Patient is null ? new PatientDto() : registration.Patient.ToDto()
			};
		}

		public static RegistrationView ToView(this RegistrationDto registration)
		{
			return new RegistrationView()
			{
				Id = registration.Id,
				Title = registration.Title,
				DateTime = registration.DateTime,
				Description = registration.Description,
				Employee = registration.Employee != null ? registration.Employee.ToRegistrationDto() : new EmployeeRegistrationDto(),
				Patient = registration.Patient != null ? registration.Patient.ToRegistrationDto() : new PatientRegistrationDto(),
				DoctorComment = registration.DoctorComment
			};
		}

		public static Registration ToEntity(this RegistrationDto registrationDto)
		{
			return new Registration()
			{
				Id = registrationDto.Id,
				Title = registrationDto.Title,
				DateTime = registrationDto.DateTime,
				Description = registrationDto.Description,
				//Employee = registrationDto.Employee is null ? new Employee() : registrationDto.Employee.ToEntity(),
				//Patient = registrationDto.Patient is null ? new Patient() : registrationDto.Patient.ToEntity(),
				EmployeeId = registrationDto.EmployeeId,
				PatientId = registrationDto.PatientId
			};
		}
	}
}
