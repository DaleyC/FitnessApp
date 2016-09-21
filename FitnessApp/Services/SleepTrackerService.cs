﻿using FitnessApp.Data;
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
            var model = _context.SleepTracker.ToList();
            return model;
        }

        public void SaveSleepForDay(SleepTracker model)
        {
            var existing = _context.SleepTracker.SingleOrDefault(x => x.SleepDate == model.SleepDate);
            if (existing == null)
            {
                _context.SleepTracker.Add(model);
            }
            _context.SaveChanges();
        }

        public void RemoveDate(DateTime date)
        {
            var existing = _context.SleepTracker.SingleOrDefault(x => x.SleepDate == date.Date);
            if (existing != null)
            {
                _context.Remove(existing);
            }

            _context.SaveChanges();
        }
    }
}
