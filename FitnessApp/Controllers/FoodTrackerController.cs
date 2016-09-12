using FitnessApp.Data.Dtos;
using FitnessApp.Data.Models;
using FitnessApp.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FitnessApp.Controllers
{
    [Route("api/[controller]")]
    public class FoodTrackerController : Controller
    {
        private readonly FoodTrackerService _foodTrackerService = new FoodTrackerService();

        [HttpPost("GetFoodForDay")]
        public IActionResult GetFoodForDay([FromBody] DateTime selectedDate)
        {
            NutritionTracker entity = _foodTrackerService.GetNutritionForDay(selectedDate);
            NutritionTrackerDto model = NutritionTrackerDto.FromEntity(entity);

            return Ok(model);            
        }

        [HttpPost("PostFoodForDay")]
        public IActionResult PostFoodForDay([FromBody] NutritionTracker model)
        {
            _foodTrackerService.SaveNutritionForDay(model);
            return Ok();
        }
    }

}
