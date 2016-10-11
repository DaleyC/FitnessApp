using FitnessApp.Data;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FitnessApp.Services
{
    public class SleepTrackerService
    {
        private readonly FitnessContext _context = new FitnessContext();

        public List<SleepTracker> GetSleepForDay()
        {
            var model = _context.SleepTracker.Where(x => x.IsActive).ToList();
            return model;
        }

        public void SaveSleepForDay(SleepTracker model)
        {
            var existing = _context.SleepTracker.SingleOrDefault(x => x.SleepDate == model.SleepDate.Date);
            if (existing == null)
            {
                _context.SleepTracker.Add(model);
            }
            else
            {
                existing.IsActive = true;
                existing.Hours = model.Hours;
                existing.TimesWokeUp = model.TimesWokeUp;
                existing.Rating = model.Rating;
                existing.Notes = model.Notes;
            }
            _context.SaveChanges();
        }

        public void DeleteDataForDate(DateTime date)
        {
            var existing = _context.SleepTracker.SingleOrDefault(x => x.SleepDate == date.Date);
            if (existing != null)
            {
                existing.IsActive = false;
            }

            _context.SaveChanges();
        }
    }
}
