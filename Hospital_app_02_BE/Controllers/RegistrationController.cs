using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hospital_app_02_BE.Contracts.Registrations;
using Hospital_app_02_BE.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_app_02_BE.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class RegistrationController : ControllerBase
	{
		private readonly IRegistrationRepository _context;

		public RegistrationController(IRegistrationRepository context)
		{
			_context = context;
		}

		[HttpGet()]
		public async Task<ActionResult> Registrations()
		{
			var registrations = (await _context.GetAll())
				.Select(x => x.ToView())				
				.ToList();

			return Ok(registrations);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult> RegistrationById(int id)
		{
			var registration = await _context.GetById(id);

			if (registration is null) return NotFound();

			return Ok(registration.ToView());
		}

		[HttpPost]
		public async Task<ActionResult> CreateRegistration([FromBody] RegistrationCreate request)
		{
			if (ModelState.IsValid)
			{
				var registrationDto = request.ToDto();
				await _context.Create(registrationDto);
				return Ok();
			}
			else
			{
				return BadRequest("model validation failed");
			}
		}

		[HttpPut("{id}")]
		public async Task<ActionResult> UpdateRegistration([FromRoute] int id, [FromBody] RegistrationUpdate request)
		{
			var registrationDto = request.ToDto();
			var updated = await _context.Update(registrationDto, id);

			if (!updated) return NotFound();

			return Ok();
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult> DeleteRegistration([FromRoute] int id)
		{
			var deleted = await _context.Delete(id);
			if (!deleted) return NotFound();
			return Ok();
		}


		[HttpGet("Patient/{id}")]
		public async Task<ActionResult> RegistrationsByPatientId(int id)
		{
			var registrations = (await _context.GetByPatientId(id))
							.Select(x => x.ToView())
							.ToList();

			return Ok(registrations);
		}

		[HttpGet("Employee/{id}")]
		public async Task<ActionResult> RegistrationByEmployeeId(int id)
		{
			var registrations = (await _context.GetByEmployeeId(id))
							.Select(x => x.ToView())
							.ToList();

			return Ok(registrations);
		}

		[HttpGet("Employee/{id}/{riskLevel}/{date}")]
		public async Task<ActionResult> RegistrationByEmployeeIdAndRiskLevelForSevenDays(int id, int riskLevel, DateTime date)
		{
			var registrations = (await _context.getByEmployeeIdAndRiskLevelForSevenDays(id, riskLevel, date))
							.Select(x => x.ToView())
							.ToList();

			return Ok(registrations);
		}

		[HttpGet("Date/{employeeId}/{date}")]
		public async Task<ActionResult> RegistrationByDate(int employeeId, DateTime date)
		{
			var registration = await _context.getByRegistrationDate(employeeId, date);

			if (registration is null) return NoContent();

			return Ok(registration.ToView());
		}

		[HttpGet("Employee/{employeeId}/{date}")]
		public async Task<ActionResult> GetRegistrationsOfEmployeeFromGivenDate(int employeeId, DateTime date)
		{
			var registrations = (await _context.getRegistrationsOfEmployeeFromGivenDate(employeeId, date))
							.Select(x => x.ToView())
							.ToList();

			return Ok(registrations);
		}

		[HttpGet("Employee/date/{employeeId}")]
		public async Task<ActionResult> GetRegistrationsOfEmployeeFromToday(int employeeId)
		{
			var registrations = (await _context.getRegistrationsOfEmployeeFromToday(employeeId))
							.Select(x => x.ToView())
							.ToList();

			return Ok(registrations);
		}

		[HttpGet("Patient/date/{patientId}")]
		public async Task<ActionResult> GetRegistrationsOfPatientFromToday(int patientId)
		{
			var registrations = (await _context.getRegistrationsOfPatientFromToday(patientId))
							.Select(x => x.ToView())
							.ToList();

			return Ok(registrations);
		}

		[HttpGet("Patient/{patientId}/{date}")]
		public async Task<ActionResult> GetRegistrationsOfPatientUntilGivenDate(int patientId, DateTime date)
		{
			var registrations = (await _context.getRegistrationsOfPatientUntilGivenDate(patientId, date))
							.Select(x => x.ToView())
							.ToList();

			return Ok(registrations);
		}
	}
}
