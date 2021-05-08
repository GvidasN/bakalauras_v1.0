using Hospital_app_02_BE.Contracts.Employees;
using Hospital_app_02_BE.Controllers;
using Hospital_app_02_BE.Linq;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Hospital_app_tests
{
    public class Employees_tests
    {
		private EmployeeController _employeeController;

		private readonly Mock<IEmployeeRepository> _IEmployeeRepository = new Mock<IEmployeeRepository>();

		private EmployeeDto _employeeDto;
		private EmployeeCreate _employeeCreate;
		private EmployeeUpdate _employeeUpdate;

		public Employees_tests()
		{
			_employeeController = new EmployeeController(_IEmployeeRepository.Object);

			_employeeDto = new EmployeeDto()
			{
				Name = "Gvidas",
				Surname = "Nor",
				Address = "Sauletekio ave. 18., Vilnius",
				BirthDate = DateTime.Now,
				Email = "test@email.com",
				Password = "Pass12453",
				PersonalCode = "3888888878",
				Phone = "8655547558",
				EmploymentDate = DateTime.Now.ToString(),
				Id = 2,
			};

			_employeeCreate = new EmployeeCreate()
			{
				Name = "Gvidas",
				Surname = "Nor",
				Address = "Sauletekio ave. 18., Vilnius",
				BirthDate = DateTime.Now,
				Email = "test@email.com",
				Password = "Pass12453",
				PersonalCode = "3888888878",
				Phone = "8655547558",
				EmploymentDate = DateTime.Now.ToString()
			};

			_employeeUpdate = new EmployeeUpdate()
			{
				Name = "Gvidas",
				Surname = "Nor",
				Address = "Sauletekio ave. 18., Vilnius",
				BirthDate = DateTime.Now,
				Email = "test@email.com",
				Password = "Pass12453",
				PersonalCode = "3888888878",
				Phone = "8655547558",
				EmploymentDate = DateTime.Now.ToString()
			};
		}

		[Fact]
		public async void Create_new_employee_Test()
		{
			var response = await _employeeController.Create(_employeeCreate);

			Assert.IsType<OkResult>(response);
		}

		[Fact]
		public async void Update_employee_Test()
		{
			var employeeId = 2;

			_IEmployeeRepository.Setup(x => x.Update(_employeeDto, employeeId))
				.ReturnsAsync(_employeeDto);

			var response = await _employeeController.Update(employeeId, _employeeUpdate);

			Assert.IsType<OkObjectResult>(response);
		}

		[Fact]
		public async void Get_all_employees_Test()
		{
			_IEmployeeRepository.Setup(x => x.GetAll())
				.ReturnsAsync(new List<EmployeeDto>());

			var response = await _employeeController.Employees();

			Assert.IsType<OkObjectResult>(response);
		}

		[Fact]
		public async void Get_single_employee_Test()
		{
			var employeeId = 2;

			_IEmployeeRepository.Setup(x => x.GetById(employeeId))
				.ReturnsAsync(_employeeDto);

			var response = await _employeeController.EmployeeById(employeeId);

			Assert.IsType<OkObjectResult>(response);
		}

		[Fact]
		public async void Delete_employee_Test()
		{
			var employeeId = 2;

			_IEmployeeRepository.Setup(x => x.Delete(employeeId))
				.ReturnsAsync(true);

			var response = await _employeeController.Delete(employeeId);

			Assert.IsType<OkResult>(response);
		}
	}
}
