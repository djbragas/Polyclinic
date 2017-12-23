// File:    Relieve.cs
// Author:  user
// Created: 1 лістапада 2017 14:53:06
// Purpose: Definition of Class Relieve

using System;
using System.Collections.Generic;

using Polyclinic.Models;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

using Polyclinic.JsonConverters;

[JsonObject(MemberSerialization.OptOut)]
public class RelieveTime
{
   
    public int Id { get; set; }

    [JsonConverter(typeof(CustomJsonDateConverter),"HH:mm")]
    [DataType(DataType.Time)]
    [Required(ErrorMessage ="Введите начало смены")]
    public DateTime StartTime { get; set; }


    [JsonConverter(typeof(CustomJsonDateConverter), "HH:mm")]
    [DataType(DataType.Time)]
    [Required(ErrorMessage = "Введите конец смены")]
    public DateTime EndTime { get; set; }

    
    public String Description { get; set; }

}