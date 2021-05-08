using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Hospital_app_02_BE.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PersonalCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmploymentDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PersonalCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RiskLevel = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Registrations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    PatientId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Registrations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Registrations_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Registrations_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "Id", "Address", "Email", "EmploymentDate", "Name", "Password", "PersonalCode", "Phone", "Role", "Surname", "Token" },
                values: new object[,]
                {
                    { 1, "Everst, 8577", "john@hospital.com", "12/29/2020 10:06:57 PM", "John", "secret11S", "388888888", "867784585", "Šeimos gydytojas", "Root", "testTokenHAHAHAHAAHAHAH" },
                    { 2, "Everst, 8577", "stefan@hospital.com", "12/29/2020 10:06:57 PM", "Stefan", "secret11S", "388888888", "867784585", "Šeimos gydytojas", "Green", "testTokenHAHAHAHAAHAHAH" },
                    { 3, "Everst, 8577", "john@hospital.com", "12/29/2020 10:06:57 PM", "Greg", "secret11S", "388888888", "867784585", "Chirurgas", "Root", "testTokenHAHAHAHAAHAHAH" }
                });

            migrationBuilder.InsertData(
                table: "Patients",
                columns: new[] { "Id", "Address", "Email", "Name", "Password", "PersonalCode", "Phone", "RiskLevel", "Surname", "Token" },
                values: new object[,]
                {
                    { 1, "Evergreeen 18, 8577", "linanana@gmail.com", "Lina", "linaSlapta123", "388888888", "867784585", 5, "Dragel", "testToken44775484" },
                    { 2, "Evergreeen 18, 8577", "jonis@gmail.com", "Jons", "jonisNesakysiu123", "388888888", "867784585", 1, "Petrauskas", "testToken44775485" },
                    { 3, "Evergreeen 18, 8577", "antanuks@gmail.com", "Antanas", "linosSlaptas123", "388888888", "867784585", 5, "Dragel", "testToken44775486" }
                });

            migrationBuilder.InsertData(
                table: "Registrations",
                columns: new[] { "Id", "DateTime", "Description", "EmployeeId", "PatientId", "Title" },
                values: new object[] { 1, new DateTime(2020, 12, 29, 22, 6, 57, 817, DateTimeKind.Local).AddTicks(3469), "Karščiavimas", 1, 1, "Registracija pas šeimos daktarą" });

            migrationBuilder.InsertData(
                table: "Registrations",
                columns: new[] { "Id", "DateTime", "Description", "EmployeeId", "PatientId", "Title" },
                values: new object[] { 3, new DateTime(2020, 12, 29, 22, 6, 57, 817, DateTimeKind.Local).AddTicks(6109), "Kojos operacija", 3, 1, "Registracija pas chirurgą" });

            migrationBuilder.InsertData(
                table: "Registrations",
                columns: new[] { "Id", "DateTime", "Description", "EmployeeId", "PatientId", "Title" },
                values: new object[] { 2, new DateTime(2020, 12, 29, 22, 6, 57, 817, DateTimeKind.Local).AddTicks(6015), "Pilvo skausmai", 1, 2, "Registracija pas šeimos daktarą" });

            migrationBuilder.CreateIndex(
                name: "IX_Registrations_EmployeeId",
                table: "Registrations",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Registrations_PatientId",
                table: "Registrations",
                column: "PatientId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Registrations");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Patients");
        }
    }
}
