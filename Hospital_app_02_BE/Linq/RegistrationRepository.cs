using Hospital_app_02_BE.Contracts.Employees;
using Hospital_app_02_BE.Contracts.Patients;
using Hospital_app_02_BE.Contracts.Registrations;
using Hospital_app_02_BE.Data;
using Hospital_app_02_BE.Data.Entities;
using Hospital_app_02_BE.Domains.Patients;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Linq
{
	public class RegistrationRepository : IRegistrationRepository
	{
		private readonly HospitalContext _context;
		private EmployeeRepository EmployeeRepository;
		private PatientRepository PatientRepository;
		public RegistrationRepository(HospitalContext context)
		{
			_context = context;
			EmployeeRepository = new EmployeeRepository(context);
			PatientRepository = new PatientRepository(context);
		}
		public async Task<List<RegistrationDto>> GetAll()
		{
			return await _context.Registrations
				.Include(x => x.Employee)
				.Include(x => x.Patient)
				.Select(x => x.ToDto())
				.ToListAsync();
		}

		public async Task<RegistrationDto> GetById(int id)
		{
			return await _context.Registrations
			.Include(x => x.Employee)
			.Include(x => x.Patient)
			.Where(x => x.Id == id)
			.Select(x => x.ToDto())
			.SingleAsync();
		}

		public async Task<List<RegistrationDto>> GetByPatientId(int userId)
		{
			return await _context.Registrations
			.Include(x => x.Employee)
			.Include(x => x.Patient)
			.Where(x => x.PatientId == userId)
			.Select(x => x.ToDto())
			.ToListAsync();
		}

		public async Task<List<RegistrationDto>> GetByEmployeeId(int userId)
		{
			return await _context.Registrations
			.Include(x => x.Employee)
			.Include(x => x.Patient)
			.Where(x => x.EmployeeId == userId)			
			.Select(x => x.ToDto())
			.ToListAsync();
		}

		public async Task<bool> Create(RegistrationDto registerDto)
		{
			var newRegistration = registerDto.ToEntity();			
			_context.Registrations.Add(newRegistration);

			await _context.SaveChangesAsync();
			return true;
		}

		public async Task<bool> Update(RegistrationDto registrationDto, int registrationId)
		{
			var registration = _context.Registrations.SingleOrDefault(x => x.Id == registrationId);

			if (registration == null) return false;

			registration.Title = registrationDto.Title ?? registration.Title;
			registration.DateTime = registrationDto.DateTime != DateTime.MinValue ? registrationDto.DateTime : registration.DateTime;
			registration.Description = registrationDto.Description ?? registration.Description;
			registration.EmployeeId = registrationDto.EmployeeId != 0 ? registrationDto.EmployeeId : registration.EmployeeId;
			registration.PatientId = registrationDto.PatientId != 0 ? registrationDto.PatientId : registration.PatientId;
			registration.DoctorComment = registrationDto.DoctorComment ?? registration.DoctorComment;
			_context.Registrations.Update(registration);
			await _context.SaveChangesAsync();

			return true;
		}

		public async Task<bool> Delete(int registrationId)
		{
			var entityExists = await _context.Registrations.SingleOrDefaultAsync(x => x.Id == registrationId);
			if (entityExists is null) return false;

			_context.Registrations.Remove(entityExists);
			await _context.SaveChangesAsync();
			return true;
		}

		public async Task<List<RegistrationDto>> getByEmployeeIdAndRiskLevelForSevenDays(int userId, int riskLevel, DateTime date)
		{
			return await _context.Registrations
			.Include(x => x.Employee)
			.Include(x => x.Patient)
			.Where(x => x.EmployeeId == userId && x.Patient.RiskLevel > riskLevel && x.DateTime > date && x.DateTime < date.AddDays(7))
			.Select(x => x.ToDto())
			.ToListAsync();
		}

		public async Task<RegistrationDto> getByRegistrationDate(int userId, DateTime date)
		{
			return await _context.Registrations
			.Include(x => x.Employee)
			.Include(x => x.Patient)
			.Where(x => x.DateTime == date && x.EmployeeId == userId)
			.Select(x => x.ToDto())
			.FirstOrDefaultAsync();
		}

		public async Task<List<RegistrationDto>> getRegistrationsOfEmployeeFromGivenDate(int userId, DateTime date)
		{
			return await _context.Registrations
			.Include(x => x.Employee)
			.Include(x => x.Patient)
			.Where(x => x.EmployeeId == userId && x.DateTime > date)
			.Select(x => x.ToDto())
			.ToListAsync();
		}

		public async Task<List<RegistrationDto>> getRegistrationsOfPatientFromToday(int userId)
		{
			return await _context.Registrations
			.Include(x => x.Employee)
			.Include(x => x.Patient)
			.Where(x => x.PatientId == userId && x.DateTime > DateTime.Now)
			.Select(x => x.ToDto())
			.ToListAsync();
		}

		public async Task<List<RegistrationDto>> getRegistrationsOfEmployeeFromToday(int userId)
		{
			return await _context.Registrations
			.Include(x => x.Employee)
			.Include(x => x.Patient)
			.Where(x => x.EmployeeId == userId && x.DateTime > DateTime.Now)
			.Select(x => x.ToDto())
			.ToListAsync();
		}

		public async Task<List<RegistrationDto>> getRegistrationsOfPatientUntilGivenDate(int userId, DateTime date)
		{
			return await _context.Registrations
			.Include(x => x.Employee)
			.Include(x => x.Patient)
			.Where(x => x.PatientId == userId && x.DateTime < date)
			.Select(x => x.ToDto())
			.ToListAsync();
		}
	}
}
