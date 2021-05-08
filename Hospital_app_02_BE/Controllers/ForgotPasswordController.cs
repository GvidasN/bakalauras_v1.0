using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hospital_app_02_BE.Contracts.Patients;
using Hospital_app_02_BE.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_app_02_BE.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ForgotPasswordController : ControllerBase
	{
		private readonly IForgotPassword _context;

		public ForgotPasswordController(IForgotPassword context)
		{
			_context = context;
		}

		[HttpGet("{email}")]
		public async Task<ActionResult> ForgotPassword(string email)
		{
			var patient = await _context.RemindPassword(email);

			if (patient is null) return NotFound();

			return Ok(patient.ToView());
		}
	}
}
