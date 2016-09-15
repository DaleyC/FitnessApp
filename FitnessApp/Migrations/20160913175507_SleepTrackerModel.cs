using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FitnessApp.Migrations
{
    public partial class SleepTrackerModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SleepTracker",
                columns: table => new
                {
                    SleepDate = table.Column<DateTime>(type: "Date", nullable: false),
                    HoursSlept = table.Column<int>(nullable: false),
                    Notes = table.Column<string>(nullable: true),
                    QualityId = table.Column<string>(nullable: true),
                    WokenId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SleepTracker", x => x.SleepDate);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SleepTracker");
        }
    }
}
