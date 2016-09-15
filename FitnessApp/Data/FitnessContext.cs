using FitnessApp.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace FitnessApp.Data
{
    public class FitnessContext : DbContext
    {

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=FitnessTracker;Trusted_Connection=True;");
        }

        public DbSet<NutritionTracker> NutritionTracker { get; set; }
        public DbSet<NutritionTracker_Meals> NutritionTracker_Meals { get; set; }
        public DbSet<SleepTracker> SleepTracker { get; set; }
    }
}
