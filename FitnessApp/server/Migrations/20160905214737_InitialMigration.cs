using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FitnessApp.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NutritionTracker",
                columns: table => new
                {
                    NutritionDate = table.Column<DateTime>(type: "Date", nullable: false),
                    Water = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NutritionTracker", x => x.NutritionDate);
                });

            migrationBuilder.CreateTable(
                name: "NutritionTracker_Meals",
                columns: table => new
                {
                    MealId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Calories = table.Column<int>(nullable: false),
                    Carbs = table.Column<int>(nullable: false),
                    Fat = table.Column<int>(nullable: false),
                    FoodItem = table.Column<string>(nullable: true),
                    MealName = table.Column<string>(nullable: true),
                    NutritionDate = table.Column<DateTime>(type: "Date", nullable: false),
                    Protein = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NutritionTracker_Meals", x => x.MealId);
                    table.ForeignKey(
                        name: "FK_NutritionTracker_Meals_NutritionTracker_NutritionDate",
                        column: x => x.NutritionDate,
                        principalTable: "NutritionTracker",
                        principalColumn: "NutritionDate",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NutritionTracker_Meals_NutritionDate",
                table: "NutritionTracker_Meals",
                column: "NutritionDate");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NutritionTracker_Meals");

            migrationBuilder.DropTable(
                name: "NutritionTracker");
        }
    }
}
