using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hospital_app_02_BE.Contracts.News;
using Hospital_app_02_BE.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_app_02_BE.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class NewsController : ControllerBase
	{
		private readonly INewsRepository _context;

		public NewsController(INewsRepository context)
		{
			_context = context;
		}

		[HttpGet]
		public async Task<ActionResult> News()
		{
			var patients = (await _context.GetAll())
				.Select(x => x.ToView())
				.ToList();

			return Ok(patients);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult> NewsById(int id)
		{
			var news = await _context.GetById(id);

			if (news is null) return NotFound();

			return Ok(news.ToView());
		}

		[HttpPost]
		public async Task<ActionResult> CreateNews([FromBody] NewsCreate request)
		{
			if (ModelState.IsValid)
			{
				var newsDto = request.ToDto();
				await _context.Create(newsDto);
				return Ok();
			}

			return BadRequest("model validation failed");
		}

		[HttpPut("{id}")]
		public async Task<ActionResult> UpdateNews([FromRoute] int id, [FromBody] NewsUpdate request)
		{
			if (ModelState.IsValid)
			{
				var newsDto = request.ToDto();
				var updated = await _context.Update(newsDto, id);

				if (updated is null) return NotFound();

				return Ok();
			}

			return BadRequest("model validation failed");
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult> DeleteNews([FromRoute] int id)
		{
			var deleted = await _context.Delete(id);
			if (!deleted) return NotFound();
			return Ok();
		}
	}
}
