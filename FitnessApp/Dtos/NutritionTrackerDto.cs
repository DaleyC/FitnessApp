using FitnessApp.Data.Models;
using System;
using System.Collections.Generic;

namespace FitnessApp.Data.Dtos
{
    public class NutritionTrackerDto
    {
        public NutritionTrackerDto()
        {
            Meals = new List<NutritionMealsDto>();
        }

        public DateTime NutritionDate { get; set; }
        public int Water { get; set; }

        public List<NutritionMealsDto> Meals { get; set; }

        public static NutritionTrackerDto FromEntity(NutritionTracker entity)
        {
            var model = new NutritionTrackerDto();
            if (entity == null)
            {
                return model;
            }
            model.NutritionDate = entity.NutritionDate;
            model.Water = entity.Water;

            foreach (var item in entity.Meals)
            {

                model.Meals.Add(NutritionMealsDto.FromEntity(item));
            }
            return model;
        }
    }

    public class NutritionMealsDto
    {
        public int MealId { get; set; }
        public string MealName { get; set; }
        public string FoodItem { get; set; }
        public int Calories { get; set; }
        public int Fat { get; set; }
        public int Carbs { get; set; }
        public int Protein { get; set; }
        public DateTime NutritionDate { get; set; }

        public static NutritionMealsDto FromEntity(NutritionTracker_Meals entity)
        {
            var model = new NutritionMealsDto();

            model.MealName = entity.MealName;
            model.FoodItem = entity.FoodItem;
            model.Calories = entity.Calories;
            model.Fat = entity.Fat;
            model.Carbs = entity.Carbs;
            model.Protein = entity.Protein;
            model.NutritionDate = entity.NutritionDate;

            return model;
        }
    }

}
