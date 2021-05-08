using Hospital_app_02_BE.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Data
{
	public class HospitalContext : DbContext
	{
		public DbSet<Patient> Patients { get; set; }
		public DbSet<Employee> Employees { get; set; }
		public DbSet<Registration> Registrations { get; set; }
		public DbSet<News> News { get; set; }
		public DbSet<Critical_situation_confirmations> Critical_Situation_Confirmations { get; set; }

		public HospitalContext(DbContextOptions options) : base(options)
		{ 			
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			//Patient

			var patientBuilder = modelBuilder.Entity<Patient>();
			patientBuilder.HasKey(x => x.Id);

			patientBuilder.HasMany(x => x.Registrations)
				.WithOne(x => x.Patient)
				.HasForeignKey(x => x.PatientId);

			//Employee

			var employeeBuilder = modelBuilder.Entity<Employee>();
			employeeBuilder.HasKey(x => x.Id);

			employeeBuilder.HasMany(x => x.Registrations)
				.WithOne(x => x.Employee)
				.HasForeignKey(x => x.EmployeeId);

			//Registrations

			var registrationBuilder = modelBuilder.Entity<Registration>();
			registrationBuilder.HasKey(x => x.Id);

			//News

			var newsBuilder = modelBuilder.Entity<News>();
			newsBuilder.HasKey(x => x.Id);

			var patients = new Dictionary<string, Patient>()
			{
				{"Patient1", new Patient(){Id=1, Name="Lina", Surname="Dragel", Email="linanana@gmail.com", Address="Evergreeen 18, 8577", Password="linaSlapta123",
					PersonalCode="388888888", Phone="867784585", RiskLevel=5, Token="testToken44775484"} },
				{"Patient2", new Patient(){Id=2, Name="Jons", Surname="Petrauskas", Email="jonis@gmail.com", Address="Evergreeen 18, 8577", Password="jonisNesakysiu123",
					PersonalCode="388888888", Phone="867784585", RiskLevel=1, Token="testToken44775485"} },
				{"Patient3", new Patient(){Id=3, Name="Antanas", Surname="Dragel", Email="antanuks@gmail.com", Address="Evergreeen 18, 8577", Password="linosSlaptas123",
					PersonalCode="388888888", Phone="867784585", RiskLevel=5, Token="testToken44775486"} }
			};

			var employees = new Dictionary<string, Employee>()
			{
				{"Employee1", new Employee(){Id=1, Name="John", Surname="Root", Email="john@hospital.com", Address="Everst, 8577", Password="secret11S", 
					EmploymentDate=DateTime.Now.ToString(), PersonalCode="388888888", Phone="867784585", Role="Šeimos gydytojas", Token="testTokenHAHAHAHAAHAHAH"} },
				{"Employee2", new Employee(){Id=2, Name="Stefan", Surname="Green", Email="stefan@hospital.com", Address="Everst, 8577", Password="secret11S",
					EmploymentDate=DateTime.Now.ToString(), PersonalCode="388888888", Phone="867784585", Role="Šeimos gydytojas", Token="testTokenHAHAHAHAAHAHAH"} },
				{"Employee3", new Employee(){Id=3, Name="Greg", Surname="Root", Email="john@hospital.com", Address="Everst, 8577", Password="secret11S",
					EmploymentDate=DateTime.Now.ToString(), PersonalCode="388888888", Phone="867784585", Role="Chirurgas", Token="testTokenHAHAHAHAAHAHAH"} },
			};

			var registrations = new Dictionary<string, Registration>(){
				{"Reg1", new Registration(){Id = 1, Title="Registracija pas šeimos daktarą", Description="Karščiavimas", DateTime=DateTime.Now, EmployeeId=1, PatientId=1}},
				{"Reg2", new Registration(){Id = 2, Title="Registracija pas šeimos daktarą", Description="Pilvo skausmai", DateTime=DateTime.Now, EmployeeId=1, PatientId=2}},
				{"Reg3", new Registration(){Id = 3, Title="Registracija pas chirurgą", Description="Kojos operacija", DateTime=DateTime.Now, EmployeeId=3, PatientId=1}}
			};

			var news = new Dictionary<string, News>()
			{
				{"News1", new News(){Id = 1, Title = "Naujos vakcinos importas", Description="Greitu metu pasirodys naujos vakcinos nuo COVID-19", Date = DateTime.Now} },
				{"News2", new News(){Id = 2, Title = "Sistemos atnaujinimai", Description="Šiuo metu vyksta laikini sistemos atnaujinimai, todėl sistema gali veikti netinkamai. Atsiprašome.", Date = DateTime.Now} },
				{"News3", new News(){Id = 3, Title = "Naujas kolektyvas", Description="Šiuo metu gydymo įstaiga įdarbina gausybę naujų žmonių!", Date = DateTime.Now} }
			};

			patientBuilder.HasData(patients.Values.ToArray());
			employeeBuilder.HasData(employees.Values.ToArray());
			registrationBuilder.HasData(registrations.Values.ToArray());
			newsBuilder.HasData(news.Values.ToArray());
		}
	}	
}
