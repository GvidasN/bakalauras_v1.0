using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hospital_app_02_BE.Contracts.Employees;
using Hospital_app_02_BE.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_app_02_BE.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class EmployeeController : ControllerBase
	{
		private readonly IEmployeeRepository _context;

		public EmployeeController(IEmployeeRepository context)
		{
			_context = context;
		}


		[HttpGet]
		public async Task<ActionResult> Employees()
		{
			var employees = (await _context.GetAll())
				.Select(x => x.ToView())
				.ToList();

			return Ok(employees);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult> EmployeeById(int id)
		{
			var employee = await _context.GetById(id);

			if (employee is null) return NotFound();

			return Ok(employee.ToView());
		}

		[HttpPost]
		[AllowAnonymous]
		public async Task<ActionResult> Create([FromBody] EmployeeCreate request)
		{
			if (ModelState.IsValid)
			{
				var employeeDto = request.ToDto();
				await _context.Create(employeeDto);
				return Ok();
			}

			return BadRequest("model validation failed");			
		}

		[HttpPut("{id}")]
		public async Task<ActionResult> Update([FromRoute] int id, [FromBody] EmployeeUpdate request)
		{
			if (ModelState.IsValid)
			{
				var employeeDto = request.ToDto();
				var updated = await _context.Update(employeeDto, id);

				if (updated is null) return NotFound();

				return Ok();
			}

			return BadRequest("model validation failed");		
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult> Delete([FromRoute] int id)
		{
			var deleted = await _context.Delete(id);
			if (!deleted) return NotFound();
			return Ok();
		}
	}

}
