using FitnessApp.Data;
using System;

namespace FitnessApp.Dtos
{
    public class SleepTrackerDto
    {
        public DateTime SleepDate { get; set; }
        public int Hours { get; set; }
        public string TimesWokeUp { get; set; }
        public string Rating { get; set; }
        public string Notes { get; set; }

        public static SleepTrackerDto FromEntity(SleepTracker entity)
        {
            var model = new SleepTrackerDto();
            if(entity == null)
            {
                return model;
            }
            model.SleepDate = entity.SleepDate;
            model.Hours = entity.Hours;
            model.TimesWokeUp = entity.TimesWokeUp;
            model.Rating = entity.Rating;
            model.Notes = entity.Notes;

            return model;
        }
    }
}
