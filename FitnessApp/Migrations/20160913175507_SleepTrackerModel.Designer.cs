using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using FitnessApp.Data;

namespace FitnessApp.Migrations
{
    [DbContext(typeof(FitnessContext))]
    [Migration("20160913175507_SleepTrackerModel")]
    partial class SleepTrackerModel
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("FitnessApp.Data.Models.NutritionTracker", b =>
                {
                    b.Property<DateTime>("NutritionDate")
                        .HasColumnType("Date");

                    b.Property<int>("Water");

                    b.HasKey("NutritionDate");

                    b.ToTable("NutritionTracker");
                });

            modelBuilder.Entity("FitnessApp.Data.Models.NutritionTracker_Meals", b =>
                {
                    b.Property<int>("MealId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Calories");

                    b.Property<int>("Carbs");

                    b.Property<int>("Fat");

                    b.Property<string>("FoodItem");

                    b.Property<string>("MealName");

                    b.Property<DateTime>("NutritionDate")
                        .HasColumnType("Date");

                    b.Property<int>("Protein");

                    b.HasKey("MealId");

                    b.HasIndex("NutritionDate");

                    b.ToTable("NutritionTracker_Meals");
                });

            modelBuilder.Entity("FitnessApp.Data.SleepTracker", b =>
                {
                    b.Property<DateTime>("SleepDate")
                        .HasColumnType("Date");

                    b.Property<int>("HoursSlept");

                    b.Property<string>("Notes");

                    b.Property<string>("QualityId");

                    b.Property<string>("WokenId");

                    b.HasKey("SleepDate");

                    b.ToTable("SleepTracker");
                });

            modelBuilder.Entity("FitnessApp.Data.Models.NutritionTracker_Meals", b =>
                {
                    b.HasOne("FitnessApp.Data.Models.NutritionTracker", "NutritionTracker")
                        .WithMany("Meals")
                        .HasForeignKey("NutritionDate")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
