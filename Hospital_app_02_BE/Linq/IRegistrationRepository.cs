using Hospital_app_02_BE.Contracts.Registrations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Linq
{
	public interface IRegistrationRepository
	{
		Task<List<RegistrationDto>> GetAll();
		Task<RegistrationDto> GetById(int id);
		Task<List<RegistrationDto>> GetByPatientId(int userId);
		Task<List<RegistrationDto>> GetByEmployeeId(int userId);
		Task<bool> Create(RegistrationDto registrationDto);
		Task<bool> Update(RegistrationDto registrationDto, int registrationId);
		Task<bool> Delete(int id);
		Task<List<RegistrationDto>> getByEmployeeIdAndRiskLevelForSevenDays(int userId, int riskLevel, DateTime date);
		Task<RegistrationDto> getByRegistrationDate(int userId, DateTime date);
		Task<List<RegistrationDto>> getRegistrationsOfEmployeeFromGivenDate(int userId, DateTime date);
		Task<List<RegistrationDto>> getRegistrationsOfPatientFromToday(int userId);
		Task<List<RegistrationDto>> getRegistrationsOfPatientUntilGivenDate(int userId, DateTime date);
		Task<List<RegistrationDto>> getRegistrationsOfEmployeeFromToday(int userId);
	}
}
