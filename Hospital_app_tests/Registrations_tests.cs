using Hospital_app_02_BE.Contracts.Registrations;
using Hospital_app_02_BE.Controllers;
using Hospital_app_02_BE.Linq;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using Xunit;

namespace Hospital_app_tests
{
	public class Registrations_tests
	{
		private RegistrationController _registrationController;

		private readonly Mock<IRegistrationRepository> _IRegistrationRepoMock = new Mock<IRegistrationRepository>();

		private RegistrationDto _registrationDto;
		private RegistrationCreate _registrationCreate;
		private RegistrationUpdate _registrationUpdate;

		public Registrations_tests()
		{
			_registrationController = new RegistrationController(_IRegistrationRepoMock.Object);

			_registrationDto = new RegistrationDto()
			{
				Title = "Test",
				Description = "This is a test",
				DateTime = DateTime.Now,
				DoctorComment = "test comment",
				EmployeeId = 1,
				PatientId = 3
			};

			_registrationCreate = new RegistrationCreate()
			{
				Title = "Test",
				Description = "This is a test",
				DateTime = DateTime.Now,
				EmployeeId = 1,
				PatientId = 3
			};

			_registrationUpdate = new RegistrationUpdate()
			{
				Title = "Updated Test",
				Description = "This is a test",
				DateTime = DateTime.Now,
				DoctorComment = "test comment",
				EmployeeId = 1,
				PatientId = 3,
			};
		}

		[Fact]
		public async void Create_new_registration_Test()
		{
			var response = await _registrationController.CreateRegistration(_registrationCreate);
			
			Assert.IsType<OkResult>(response);
		}

		[Fact]
		public async void Update_registration_Test()
		{
			var registrationId = 2;

			_IRegistrationRepoMock.Setup(x => x.Update(_registrationDto, registrationId))
				.ReturnsAsync(true);

			var response = await _registrationController.UpdateRegistration(registrationId, _registrationUpdate);

			Assert.IsType<OkObjectResult>(response);
		}

		[Fact]
		public async void Get_all_registrations_Test()
		{
			_IRegistrationRepoMock.Setup(x => x.GetAll())
				.ReturnsAsync(new List<RegistrationDto>());

			var response = await _registrationController.Registrations();

			Assert.IsType<OkObjectResult>(response);
		}

		[Fact]
		public async void Get_single_registration_Test()
		{
			var registrationId = 2;

			_IRegistrationRepoMock.Setup(x => x.GetById(registrationId))
			.ReturnsAsync(_registrationDto);

			var response = await _registrationController.RegistrationById(registrationId);

			Assert.IsType<OkObjectResult>(response);
		}

		[Fact]
		public async void Delete_registration_Test()
		{
			var registrationId = 2;

			_IRegistrationRepoMock.Setup(x => x.Delete(registrationId))
			.ReturnsAsync(true);

			var response = await _registrationController.DeleteRegistration(registrationId);

			Assert.IsType<OkResult>(response);
		}
	}
}
