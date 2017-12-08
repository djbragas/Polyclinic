﻿using Polyclinic.Models;
using System;
using System.Linq;
using System.Collections;

namespace Polyclinic.Data
{
    public static class DbInitializer
    {
        public static void Initialize(PolyclinicContext context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.Specialities.Any())
            {
                return;   // DB has been seeded
            }
            if (context.Drugs.Any())
            {
                return;   // DB has been seeded
            }
            if (context.Diseases.Any())
            {
                return;   // DB has been seeded
            }
            if (context.Regions.Any())
            {
                return;
            }
                
            var Specialities = new Speciality[]
            {
            new Speciality{Name="Carson",CheckUpTime=15},
            new Speciality{Name="Carson",CheckUpTime=20},
            new Speciality{Name="Carson",CheckUpTime=30}
            };
            var Drugs = new Drug[]
            {
                 new Drug{Name="Carson",Description="323"},
                 new Drug{Name="Carson",Description="232"}
            };
            var Diseases = new Disease[]
            {
                 new Disease{Name="Carson",Description="323"},
                 new Disease{Name="Carson",Description="212"}
            };

            foreach (Disease s in Diseases)
            {
                context.Diseases.Add(s);
            }
            foreach (Speciality s in Specialities)
            {
                context.Specialities.Add(s);
            }
            foreach (Drug s in Drugs)
            {
                context.Drugs.Add(s);
            }
           

            context.SaveChanges();
        }
    }
}