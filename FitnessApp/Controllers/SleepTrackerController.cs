using System;
using FitnessApp.Data;
using FitnessApp.Dtos;
using FitnessApp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace FitnessApp.Controllers
{
    [Route("api/[controller]")]
    public class SleepTrackerController : Controller
    {
        private readonly SleepTrackerService _sleepTrackerService = new SleepTrackerService();
        [HttpPost("GetSleepForDay")]
        public IActionResult GetSleepForDay()
        {
            List<SleepTracker> entity = _sleepTrackerService.GetSleepForDay();
            List<SleepTrackerDto> newList = entity.Select(SleepTrackerDto.FromEntity).ToList();
            return Ok(newList);
        }

        [HttpPost("PostSleepForDay")]
        public IActionResult PostSleepForDay([FromBody] SleepTracker model)
        {
            _sleepTrackerService.SaveSleepForDay(model);
            return Ok();
        }

        [HttpPost("DeleteDataForDate")]
        public IActionResult DeleteDataForDate([FromBody] DateTime date)
        {
            _sleepTrackerService.DeleteDataForDate(date);
            return Ok();
        }
    }

}
