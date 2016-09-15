using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitnessApp.Data
{
    public class SleepTracker
    {
        [Column(TypeName = "Date"), Key]
        public DateTime SleepDate { get; set; }
        public int Hours { get; set; }
        public string TimesWokeUp { get; set; }
        public string Rating { get; set; }
        public string Notes { get; set; }
    }
}