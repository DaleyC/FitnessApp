using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace FitnessApp.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new string[] { "value1", "value2" });
        }

        // GET api/values/5
        [HttpPost]
        public IActionResult Post([FromBody] FoodModel model)
        {
          //var foodForDate =  databasecall.getFoodForDate(foodDate);
            return Ok("HHOOORORO");
        }

        //// POST api/values
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
          ;
        }
    }

    public class FoodModel
    {
        public DateTime SelectedDate { get; set; }
        public int Water { get; set; }
        public List<FooditemModel> Meals { get; set; }
    }

    public class FooditemModel
    {
        public string MealName { get; set; }
        public string FoodItem { get; set; }
        public int Calories { get; set; }
        public int Fat { get; set; }
        public int Carbs { get; set; }
        public int Protein { get; set; }
    }

}

