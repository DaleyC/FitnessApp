using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FitnessApp.Migrations
{
    public partial class ColumnNamesChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HoursSlept",
                table: "SleepTracker");

            migrationBuilder.DropColumn(
                name: "QualityId",
                table: "SleepTracker");

            migrationBuilder.DropColumn(
                name: "WokenId",
                table: "SleepTracker");

            migrationBuilder.AddColumn<int>(
                name: "Hours",
                table: "SleepTracker",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Rating",
                table: "SleepTracker",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TimesWokeUp",
                table: "SleepTracker",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Hours",
                table: "SleepTracker");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "SleepTracker");

            migrationBuilder.DropColumn(
                name: "TimesWokeUp",
                table: "SleepTracker");

            migrationBuilder.AddColumn<int>(
                name: "HoursSlept",
                table: "SleepTracker",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "QualityId",
                table: "SleepTracker",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WokenId",
                table: "SleepTracker",
                nullable: true);
        }
    }
}
