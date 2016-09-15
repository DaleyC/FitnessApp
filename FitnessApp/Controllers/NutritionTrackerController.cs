using FitnessApp.Data.Dtos;
using FitnessApp.Data.Models;
using FitnessApp.Services;
using Microsoft.AspNetCore.Mvc;
using System;

namespace FitnessApp.Controllers
{
    [Route("api/[controller]")]
    public class NutritionTrackerController : Controller
    {
        private readonly NutritionTrackerService _nutritionTrackerService = new NutritionTrackerService();

        [HttpPost("GetNutritionForDay")]
        public IActionResult GetNutritionForDay([FromBody] DateTime selectedDate)
        {
            NutritionTracker entity = _nutritionTrackerService.GetNutritionForDay(selectedDate);
            NutritionTrackerDto model = NutritionTrackerDto.FromEntity(entity);

            return Ok(model);
        }

        [HttpPost("PostNutritionForDay")]
        public IActionResult PostNutritionForDay([FromBody] NutritionTracker model)
        {
            _nutritionTrackerService.SaveNutritionForDay(model);
            return Ok();
        }
    }

}
