using Hospital_app_02_BE.Contracts.Patients;
using Hospital_app_02_BE.Domains.Patients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Linq
{
	public interface IPatientRepository
	{
		Task<List<PatientDto>> GetAll();
		Task<PatientDto> GetById(int id);
		Task<bool> Create(PatientDto patientDto);
		Task<PatientDto> Update(PatientDto patientDto, int patientId);
		Task<bool> Delete(int id);
	}
}
