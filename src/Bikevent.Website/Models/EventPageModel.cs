﻿using Bikevent.Database.TableObjects;

namespace Bikevent.Website.Models;

public class EventPageModel : BasePageModel
{
    public BvEventRow EventItem { get; set; }
}