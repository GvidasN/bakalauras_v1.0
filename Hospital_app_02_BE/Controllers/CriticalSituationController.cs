using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hospital_app_02_BE.Contracts.Critical_situations;
using Hospital_app_02_BE.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_app_02_BE.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class CriticalSituationController : ControllerBase
	{
		private readonly ICriticalSituationRepository _context;

		public CriticalSituationController(ICriticalSituationRepository context)
		{
			_context = context;
		}

		[HttpGet]
		public async Task<ActionResult> GetLatest()
		{
			var confirmation = await _context.GetLatest();

			return Ok(confirmation);
		}

		[HttpPost]
		public async Task<ActionResult> Create([FromBody] CriticalSituationCreate request)
		{
			if (ModelState.IsValid)
			{

				await _context.CreateNew(request.ToEntity());
				return Ok();
			}

			return BadRequest("model validation failed");
		}
	}
}
