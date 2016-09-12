using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FitnessApp.Data.Models
{
    public class NutritionTracker
    {
        public NutritionTracker()
        {
            Meals = new HashSet<NutritionTracker_Meals>();
        }

        [Column(TypeName = "Date"), Key]
        public DateTime NutritionDate { get; set; }
        public int Water { get; set; }

        public virtual ICollection<NutritionTracker_Meals> Meals { get; set; }
    }
}
