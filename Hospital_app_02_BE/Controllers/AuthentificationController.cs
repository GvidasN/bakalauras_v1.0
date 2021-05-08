using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hospital_app_02_BE.Contracts.Login;
using Hospital_app_02_BE.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Hospital_app_02_BE.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class AuthentificationController : ControllerBase
	{
		ILoginRepository _context;
		public AuthentificationController(ILoginRepository context)
		{
			_context = context;
		}

        [HttpPost]
		[AllowAnonymous]
        public async Task<ActionResult> Login([FromBody] LoginRequest loginRequest)
        {
			if (ModelState.IsValid)
			{
				var userExists = await _context.Authenticate(loginRequest);
				
				if (userExists) {
					
					var token = _context.CreateToken(loginRequest);
					var response = await _context.CreateResponse(loginRequest, token);

					
					return Ok(JsonConvert.SerializeObject(response));
				}				
			}
			return Unauthorized();
		}
    }
}
