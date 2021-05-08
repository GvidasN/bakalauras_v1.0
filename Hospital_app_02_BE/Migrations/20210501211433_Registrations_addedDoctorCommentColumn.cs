using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Hospital_app_02_BE.Migrations
{
    public partial class Registrations_addedDoctorCommentColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DoctorComment",
                table: "Registrations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 1,
                column: "EmploymentDate",
                value: "5/2/2021 12:14:32 AM");

            migrationBuilder.UpdateData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 2,
                column: "EmploymentDate",
                value: "5/2/2021 12:14:32 AM");

            migrationBuilder.UpdateData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 3,
                column: "EmploymentDate",
                value: "5/2/2021 12:14:32 AM");

            migrationBuilder.UpdateData(
                table: "News",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2021, 5, 2, 0, 14, 32, 714, DateTimeKind.Local).AddTicks(4372));

            migrationBuilder.UpdateData(
                table: "News",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2021, 5, 2, 0, 14, 32, 714, DateTimeKind.Local).AddTicks(4756));

            migrationBuilder.UpdateData(
                table: "News",
                keyColumn: "Id",
                keyValue: 3,
                column: "Date",
                value: new DateTime(2021, 5, 2, 0, 14, 32, 714, DateTimeKind.Local).AddTicks(4776));

            migrationBuilder.UpdateData(
                table: "Registrations",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateTime",
                value: new DateTime(2021, 5, 2, 0, 14, 32, 714, DateTimeKind.Local).AddTicks(2676));

            migrationBuilder.UpdateData(
                table: "Registrations",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateTime",
                value: new DateTime(2021, 5, 2, 0, 14, 32, 714, DateTimeKind.Local).AddTicks(3482));

            migrationBuilder.UpdateData(
                table: "Registrations",
                keyColumn: "Id",
                keyValue: 3,
                column: "DateTime",
                value: new DateTime(2021, 5, 2, 0, 14, 32, 714, DateTimeKind.Local).AddTicks(3516));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DoctorComment",
                table: "Registrations");

            migrationBuilder.UpdateData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 1,
                column: "EmploymentDate",
                value: "4/27/2021 12:38:53 AM");

            migrationBuilder.UpdateData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 2,
                column: "EmploymentDate",
                value: "4/27/2021 12:38:53 AM");

            migrationBuilder.UpdateData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 3,
                column: "EmploymentDate",
                value: "4/27/2021 12:38:53 AM");

            migrationBuilder.UpdateData(
                table: "News",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2021, 4, 27, 0, 38, 53, 375, DateTimeKind.Local).AddTicks(4332));

            migrationBuilder.UpdateData(
                table: "News",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2021, 4, 27, 0, 38, 53, 375, DateTimeKind.Local).AddTicks(4781));

            migrationBuilder.UpdateData(
                table: "News",
                keyColumn: "Id",
                keyValue: 3,
                column: "Date",
                value: new DateTime(2021, 4, 27, 0, 38, 53, 375, DateTimeKind.Local).AddTicks(4801));

            migrationBuilder.UpdateData(
                table: "Registrations",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateTime",
                value: new DateTime(2021, 4, 27, 0, 38, 53, 375, DateTimeKind.Local).AddTicks(2290));

            migrationBuilder.UpdateData(
                table: "Registrations",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateTime",
                value: new DateTime(2021, 4, 27, 0, 38, 53, 375, DateTimeKind.Local).AddTicks(3369));

            migrationBuilder.UpdateData(
                table: "Registrations",
                keyColumn: "Id",
                keyValue: 3,
                column: "DateTime",
                value: new DateTime(2021, 4, 27, 0, 38, 53, 375, DateTimeKind.Local).AddTicks(3455));
        }
    }
}
