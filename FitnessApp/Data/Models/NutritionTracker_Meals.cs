using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FitnessApp.Data.Models
{
    public class NutritionTracker_Meals
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MealId { get; set; }

        public string MealName { get; set; }
        public string FoodItem { get; set; }
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
