using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hospital_app_02_BE.Contracts.Patients;
using Hospital_app_02_BE.Data;
using Hospital_app_02_BE.Data.Entities;
using Hospital_app_02_BE.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hospital_app_02_BE.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class PatientController : ControllerBase
	{
		private readonly IPatientRepository _context;

		public PatientController(IPatientRepository context)
		{
			_context = context;
		}

		[HttpGet]
		public async Task<ActionResult> Patients()
		{
			var patients = (await _context.GetAll())
				.Select(x => x.ToView())
				.ToList();

			return Ok(patients);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult> PatientById(int id)
		{
			var patient = await _context.GetById(id);

			if (patient is null) return NotFound();

			return Ok(patient.ToView());
		}

		[HttpPost]
		[AllowAnonymous]
		public async Task<ActionResult> CreatePatient([FromBody] PatientCreate request)
		{
			if (ModelState.IsValid)
			{
				var patientDto = request.ToDto();
				await _context.Create(patientDto);
				return Ok();
			}

			return BadRequest("model validation failed");			
		}

		[HttpPut("{id}")]
		public async Task<ActionResult> UpdatePatient([FromRoute] int id, [FromBody] PatientUpdate request)
		{
				var patientDto = request.ToDto();
				var updated = await _context.Update(patientDto, id);

				if (updated is null) return NotFound();

				return Ok();		
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult> DeletePatient([FromRoute] int id)
		{
			var deleted = await _context.Delete(id);
			if (!deleted) return NotFound();
			return Ok();
		}
	}
}
