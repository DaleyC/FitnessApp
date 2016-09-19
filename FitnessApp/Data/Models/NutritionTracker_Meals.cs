using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitnessApp.Data.Models
{
    public class NutritionTracker_Meals
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MealId { get; set; }

        public string MealName { get; set; }
        public string FoodItem { get; set; }
        public int Servings { get; set; }
        public int Calories { get; set; }
        public int Fat { get; set; }
        public int Carbs { get; set; }
        public int Protein { get; set; }
        [Column(TypeName = "Date")]
        public DateTime NutritionDate { get; set; }

        [ForeignKey("NutritionDate")]
        public NutritionTracker NutritionTracker { get; set; }
    }
}
