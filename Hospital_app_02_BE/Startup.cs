using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Hospital_app_02_BE.Data;
using Hospital_app_02_BE.Linq;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace Hospital_app_02_BE
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			var connectionString = Configuration.GetConnectionString("default");

			services.AddControllers();
			services.AddDbContext<HospitalContext>(o => o.UseSqlServer(connectionString));
			services.AddScoped<IPatientRepository, PatientRepository>();
			services.AddScoped<IRegistrationRepository, RegistrationRepository>();
			services.AddScoped<IEmployeeRepository, EmployeeRepository>();
			services.AddScoped<ILoginRepository, LoginRepository>();
			services.AddScoped<INewsRepository, NewsRepository>();
			services.AddScoped<IForgotPassword, ForgotPassword>();
			services.AddScoped<ICriticalSituationRepository, CriticalSituationRepository>();

			var key = Encoding.ASCII.GetBytes("YOUR SPECIAL SECRET USED TO VERIFY JWT TOKENS, CAN BE ANY STRING!");

			services.AddAuthentication(x =>
			{
				x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

			}).AddJwtBearer(x =>
				{
					x.TokenValidationParameters = new TokenValidationParameters
					{
						ValidateIssuerSigningKey = true,
						IssuerSigningKey = new SymmetricSecurityKey(key),
						ValidateIssuer = false,
						ValidateAudience = false
					};
				});

			services.AddCors(options =>
			{
				options.AddPolicy("AllowAll",
				builder =>
				{
					builder.AllowAnyOrigin()
						   .AllowAnyMethod()
						   .AllowAnyHeader();
					//.AllowCredentials();
				});
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseCors("AllowAll");

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseAuthentication();

			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}
