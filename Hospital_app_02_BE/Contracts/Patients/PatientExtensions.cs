using Hospital_app_02_BE.Contracts.Registrations;
using Hospital_app_02_BE.Data.Entities;
using Hospital_app_02_BE.Domains.Patients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Contracts.Patients
{
	public static class PatientExtensions
	{
		public static PatientView ToView(this PatientDto patientDto)
		{
			return new PatientView()
			{
				Id = patientDto.Id,
				Name = patientDto.Name,
				Surname = patientDto.Surname,
				Email = patientDto.Email,
				Password = patientDto.Password,
				Address = patientDto.Address,
				Phone = patientDto.Phone,
				PersonalCode = patientDto.PersonalCode,
				RiskLevel = patientDto.RiskLevel,
				Registrations = patientDto.Registrations,
				BirthDate = patientDto.BirthDate
			};
		}

		public static Patient ToEntity(this PatientDto patientDto)
		{
			return new Patient()
			{
				Name = patientDto.Name,
				Surname = patientDto.Surname,
				Email = patientDto.Email,
				Password = patientDto.Password,
				Address = patientDto.Address,
				Phone = patientDto.Phone,
				PersonalCode = patientDto.PersonalCode,
				RiskLevel = patientDto.RiskLevel,
				BirthDate = patientDto.BirthDate,
				Registrations = patientDto.Registrations is null ? new List<Registration>() : patientDto.Registrations
				.Select(x => new Registration()
				{
					Title = x.Title,
					DateTime = x.DateTime,
					Description = x.Description,
					EmployeeId = x.EmployeeId,
					PatientId = x.PatientId
				}).ToList()
			};
		}

		public static PatientDto ToDto(this PatientCreate patientCreate)
		{
			return new PatientDto()
			{
				Name = patientCreate.Name,
				Surname = patientCreate.Surname,
				Email = patientCreate.Email,
				Password = patientCreate.Password,
				Address = patientCreate.Address,
				Phone = patientCreate.Phone,
				PersonalCode = patientCreate.PersonalCode,
				RiskLevel = patientCreate.RiskLevel,
				BirthDate = patientCreate.BirthDate,
				Registrations = new List<RegistrationDto>()
			};
		}

		public static PatientDto ToDto(this PatientUpdate patientUpdate)
		{
			return new PatientDto()
			{
				Id = patientUpdate.Id,
				Name = patientUpdate.Name,
				Surname = patientUpdate.Surname,
				Email = patientUpdate.Email,
				Password = patientUpdate.Password,
				Address = patientUpdate.Address,
				Phone = patientUpdate.Phone,
				PersonalCode = patientUpdate.PersonalCode,
				RiskLevel = patientUpdate.RiskLevel,
				BirthDate = patientUpdate.BirthDate,
				Registrations = patientUpdate.Registrations is null ? new List<RegistrationDto>() : patientUpdate.Registrations
				.Select(x => new RegistrationDto()
				{
					Title = x.Title,
					DateTime = x.DateTime,
					Description = x.Description,
					EmployeeId = x.EmployeeId,
					PatientId = x.PatientId
				}).ToList()
			};
		}

		public static PatientRegistrationDto ToRegistrationDto(this PatientDto patient)
		{
			return new PatientRegistrationDto()
			{
				Id = patient.Id,
				Name = patient.Name,
				Surname = patient.Surname,
				Email = patient.Email,
				Password = patient.Password,
				Address = patient.Address,
				Phone = patient.Phone,
				PersonalCode = patient.PersonalCode,
				RiskLevel = patient.RiskLevel,
				BirthDate = patient.BirthDate,
			};
		}

		public static PatientDto ToDto(this Patient patient)
		{
			return new PatientDto()
			{
				Id = patient.Id,
				Name = patient.Name,
				Surname = patient.Surname,
				Email = patient.Email,
				Password = patient.Password,
				Address = patient.Address,
				Phone = patient.Phone,
				PersonalCode = patient.PersonalCode,
				RiskLevel = patient.RiskLevel,
				BirthDate = patient.BirthDate,
				Registrations = patient.Registrations is null ? new List<RegistrationDto>() : patient.Registrations
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
	}
}
