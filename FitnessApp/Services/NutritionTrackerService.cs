using FitnessApp.Data;
using FitnessApp.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace FitnessApp.Services
{
    public class NutritionTrackerService
    {
        private readonly FitnessContext _context = new FitnessContext();

        public NutritionTracker GetNutritionForDay(DateTime selectedDate)
        {
            var model = _context.NutritionTracker.Include(x => x.Meals).SingleOrDefault(x => x.NutritionDate == selectedDate.Date);
            return model;
        }

        public void SaveNutritionForDay(NutritionTracker model)
        {
            var nutritionDate = model.NutritionDate.Date;
            var existing = _context.NutritionTracker.Include(x => x.Meals).SingleOrDefault(x => x.NutritionDate == nutritionDate);
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

                    var meal = model.Meals.Single(x => x.MealId == item.MealId);
                    item.MealName = meal.MealName;
                    item.FoodItem = meal.FoodItem;
                    item.Servings = meal.Servings;
                    item.Calories = meal.Calories;
                    item.Carbs = meal.Carbs;
                    item.Fat = meal.Fat;
                    item.Protein = meal.Protein;
                });

                //insert new
                model.Meals.ToList().ForEach(item =>
                {
                    if (item.MealId != 0)
                        return;

                    existing.Meals.Add(item);
                });
            }
            _context.SaveChanges();
        }
    }
}
