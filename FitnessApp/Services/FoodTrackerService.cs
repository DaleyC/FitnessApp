using FitnessApp.Data;
using FitnessApp.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FitnessApp.Services
{
    public class FoodTrackerService
    {
        private readonly FitnessContext _context = new FitnessContext();

        public NutritionTracker GetNutritionForDay(DateTime selectedDate)
        {
            var model = _context.NutritionTracker.Include(x => x.Meals).SingleOrDefault(x => x.NutritionDate == selectedDate);
            return model;
        }

        public void SaveNutritionForDay(NutritionTracker model)
        {
            var existing = _context.NutritionTracker.Include(x => x.Meals).SingleOrDefault(x => x.NutritionDate == model.NutritionDate);
            if (existing == null)
            {
                _context.Add(model);
            }
           else
            {
                existing.Water = model.Water;

                var updatingPks = model.Meals.Select(x => x.MealId).ToList();
                existing.Meals.Where(x => !updatingPks.Contains(x.MealId))
                  .ToList()
                  .ForEach(item => _context.NutritionTracker_Meals.Remove(item));

                //update remaining
                existing.Meals.ToList().ForEach(item =>
                {
                    if (!updatingPks.Contains(item.MealId))
                        return;

                    item.MealName = item.MealName;
                    item.Calories = item.Calories;
                    item.Carbs = item.Carbs;
                    item.Fat = item.Fat;
                    item.FoodItem = item.FoodItem;
                    item.Protein = item.Protein;
                });

                //insert new
                model.Meals.ToList().ForEach(item =>
                {
                    if (item.MealId != 0)
                        return;

                    existing.Meals.Add(item);
                });
                model.Meals.ToList().ForEach(x => existing.Meals.Add(x));               
            }
            _context.SaveChanges();
        }
    }
}
