using Hospital_app_02_BE.Contracts.Patients;
using Hospital_app_02_BE.Data;
using Hospital_app_02_BE.Domains.Patients;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Linq
{
	public class PatientRepository : IPatientRepository
	{
		private readonly HospitalContext _context;
		public PatientRepository(HospitalContext context)
		{
			 _context = context;
		}

		public async Task<List<PatientDto>> GetAll()
		{
			return await _context.Patients
				.Include(x => x.Registrations)					
				.Select(x => x.ToDto())
				.ToListAsync();
		}

		public async Task<PatientDto> GetById(int id)
		{
			return await _context.Patients
				.Where(x => x.Id == id)
				.Include(x => x.Registrations)
				.Select(x => x.ToDto())
				.SingleOrDefaultAsync();
		}

		public async Task<bool> Create(PatientDto patientDto)
		{
			var entity = patientDto.ToEntity();
			_context.Patients.Add(entity);
			_context.Registrations.AddRange(entity.Registrations);
			await _context.SaveChangesAsync();
			return true;
		}

		public async Task<PatientDto> Update(PatientDto patientDto, int patientId)
		{
			var entity = await _context.Patients.SingleOrDefaultAsync(x => x.Id == patientId);
			if (entity == null) return null;

			entity.Name = patientDto.Name ?? entity.Name;
			entity.Surname = patientDto.Surname ?? entity.Surname;
			entity.Email = patientDto.Email ?? entity.Email;
			entity.Password = patientDto.Password ?? entity.Password;
			entity.Phone = patientDto.Phone ?? entity.Phone;
			entity.Address = patientDto.Address ?? entity.Address;
			entity.PersonalCode = patientDto.PersonalCode ?? entity.PersonalCode;
			entity.RiskLevel = patientDto.RiskLevel != 0 ? patientDto.RiskLevel : entity.RiskLevel;
			entity.BirthDate = patientDto.BirthDate;

			_context.Patients.Update(entity);
			await _context.SaveChangesAsync();
			return await GetById(entity.Id);
		}

		public async Task<bool> Delete (int patientId)
		{
			var entity = await _context.Patients.SingleOrDefaultAsync(x => x.Id == patientId);
			if (entity is null) return false;

			_context.Patients.Remove(entity);
			await _context.SaveChangesAsync();
			return true;
		}
	}
}
