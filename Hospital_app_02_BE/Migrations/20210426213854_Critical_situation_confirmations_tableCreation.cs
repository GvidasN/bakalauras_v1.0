using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Hospital_app_02_BE.Migrations
{
    public partial class Critical_situation_confirmations_tableCreation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Critical_Situation_Confirmations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsCritical = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Critical_Situation_Confirmations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Critical_Situation_Confirmations_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_Critical_Situation_Confirmations_EmployeeId",
                table: "Critical_Situation_Confirmations",
                column: "EmployeeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Critical_Situation_Confirmations");

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

            migrationBuilder.UpdateData(
                table: "News",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2021, 4, 8, 0, 7, 6, 748, DateTimeKind.Local).AddTicks(8531));

            migrationBuilder.UpdateData(
                table: "News",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2021, 4, 8, 0, 7, 6, 748, DateTimeKind.Local).AddTicks(9611));

            migrationBuilder.UpdateData(
                table: "News",
                keyColumn: "Id",
                keyValue: 3,
                column: "Date",
                value: new DateTime(2021, 4, 8, 0, 7, 6, 748, DateTimeKind.Local).AddTicks(9654));

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
    }
}
