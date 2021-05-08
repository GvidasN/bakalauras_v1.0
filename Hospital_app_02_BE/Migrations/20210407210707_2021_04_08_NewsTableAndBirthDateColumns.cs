using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Hospital_app_02_BE.Migrations
{
    public partial class _2021_04_08_NewsTableAndBirthDateColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "BirthDate",
                table: "Patients",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "BirthDate",
                table: "Employees",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "News",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_News", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 1,
                column: "EmploymentDate",
                value: "4/8/2021 12:07:06 AM");

            migrationBuilder.UpdateData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 2,
                column: "EmploymentDate",
                value: "4/8/2021 12:07:06 AM");

            migrationBuilder.UpdateData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 3,
                column: "EmploymentDate",
                value: "4/8/2021 12:07:06 AM");

            migrationBuilder.InsertData(
                table: "News",
                columns: new[] { "Id", "Date", "Description", "Title" },
                values: new object[,]
                {
                    { 1, new DateTime(2021, 4, 8, 0, 7, 6, 748, DateTimeKind.Local).AddTicks(8531), "Greitu metu pasirodys naujos vakcinos nuo COVID-19", "Naujos vakcinos importas" },
                    { 2, new DateTime(2021, 4, 8, 0, 7, 6, 748, DateTimeKind.Local).AddTicks(9611), "Šiuo metu vyksta laikini sistemos atnaujinimai, todėl sistema gali veikti netinkamai. Atsiprašome.", "Sistemos atnaujinimai" },
                    { 3, new DateTime(2021, 4, 8, 0, 7, 6, 748, DateTimeKind.Local).AddTicks(9654), "Šiuo metu gydymo įstaiga įdarbina gausybę naujų žmonių!", "Naujas kolektyvas" }
                });

            migrationBuilder.UpdateData(
                table: "Registrations",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateTime",
                value: new DateTime(2021, 4, 8, 0, 7, 6, 748, DateTimeKind.Local).AddTicks(2893));

            migrationBuilder.UpdateData(
                table: "Registrations",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateTime",
                value: new DateTime(2021, 4, 8, 0, 7, 6, 748, DateTimeKind.Local).AddTicks(6299));

            migrationBuilder.UpdateData(
                table: "Registrations",
                keyColumn: "Id",
                keyValue: 3,
                column: "DateTime",
                value: new DateTime(2021, 4, 8, 0, 7, 6, 748, DateTimeKind.Local).AddTicks(6405));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "News");

            migrationBuilder.DropColumn(
                name: "BirthDate",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "BirthDate",
                table: "Employees");

            migrationBuilder.UpdateData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 1,
                column: "EmploymentDate",
                value: "12/29/2020 10:06:57 PM");

            migrationBuilder.UpdateData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 2,
                column: "EmploymentDate",
                value: "12/29/2020 10:06:57 PM");

            migrationBuilder.UpdateData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 3,
                column: "EmploymentDate",
                value: "12/29/2020 10:06:57 PM");

            migrationBuilder.UpdateData(
                table: "Registrations",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateTime",
                value: new DateTime(2020, 12, 29, 22, 6, 57, 817, DateTimeKind.Local).AddTicks(3469));

            migrationBuilder.UpdateData(
                table: "Registrations",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateTime",
                value: new DateTime(2020, 12, 29, 22, 6, 57, 817, DateTimeKind.Local).AddTicks(6015));

            migrationBuilder.UpdateData(
                table: "Registrations",
                keyColumn: "Id",
                keyValue: 3,
                column: "DateTime",
                value: new DateTime(2020, 12, 29, 22, 6, 57, 817, DateTimeKind.Local).AddTicks(6109));
        }
    }
}
