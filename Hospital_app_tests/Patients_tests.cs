using Hospital_app_02_BE.Contracts.Patients;
using Hospital_app_02_BE.Controllers;
using Hospital_app_02_BE.Domains.Patients;
using Hospital_app_02_BE.Linq;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using Xunit;

namespace Hospital_app_tests
{
	public class Patients_tests
	{
		private PatientController _patientController;

		private readonly Mock<IPatientRepository> _IPatientRepository = new Mock<IPatientRepository>();

		private PatientDto _patientDto;
		private PatientCreate _patientCreate;
		private PatientUpdate _patientUpdate;

		public Patients_tests()
		{
			_patientController = new PatientController(_IPatientRepository.Object);

			_patientDto = new PatientDto()
			{
				Name = "Gvidas",
				Surname = "Nor",
				Address = "Sauletekio ave. 18., Vilnius",
				BirthDate = DateTime.Now,
				Email = "test@email.com",
				Password = "Pass12453",
				PersonalCode = "3888888878",
				Phone = "8655547558",
				RiskLevel = 2,
				Id = 2,		
			};

			_patientCreate = new PatientCreate()
			{
				Name = "Gvidas",
				Surname = "Nor",
				Address = "Sauletekio ave. 18., Vilnius",
				BirthDate = DateTime.Now,
				Email = "test@email.com",
				Password = "Pass12453",
				PersonalCode = "3888888878",
				Phone = "8655547558",
				RiskLevel = 2
			};

			_patientUpdate = new PatientUpdate()
			{
				Name = "Gvidas",
				Surname = "Nor",
				Address = "Sauletekio ave. 18., Vilnius",
				BirthDate = DateTime.Now,
				Email = "test@email.com",
				Password = "Pass12453",
				PersonalCode = "3888888878",
				Phone = "8655547558",
				RiskLevel = 2
			};
		}

		[Fact]
		public async void Create_new_patient_Test()
		{
			var response = await _patientController.CreatePatient(_patientCreate);

			Assert.IsType<OkResult>(response);
		}

		[Fact]
		public async void Update_patient_Test()
		{
			var patientId = 2;

			_IPatientRepository.Setup(x => x.Update(_patientDto, patientId))
				.ReturnsAsync(_patientDto);

			var response = await _patientController.UpdatePatient(patientId, _patientUpdate);

			Assert.IsType<OkObjectResult>(response);
		}

		[Fact]
		public async void Get_all_patients_Test()
		{
			_IPatientRepository.Setup(x => x.GetAll())
				.ReturnsAsync(new List<PatientDto>());

			var response = await _patientController.Patients();

			Assert.IsType<OkObjectResult>(response);
		}

		[Fact]
		public async void Get_single_patient_Test()
		{
			var patientId = 2;

			_IPatientRepository.Setup(x => x.GetById(patientId))
				.ReturnsAsync(_patientDto);

			var response = await _patientController.PatientById(patientId);

			Assert.IsType<OkObjectResult>(response);
		}

		[Fact]
		public async void Delete_patient_Test()
		{
			var patientId = 2;

			_IPatientRepository.Setup(x => x.Delete(patientId))
				.ReturnsAsync(true);

			var response = await _patientController.DeletePatient(patientId);

			Assert.IsType<OkResult>(response);
		}
	}
}
