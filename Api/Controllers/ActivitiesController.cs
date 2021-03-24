using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using persistence;
using MediatR;
using application.Activities;

namespace Api.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        
        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            // return await _context.Activities.ToListAsync();
            var activities = await Mediator.Send(new List.Query());
            return HandleResult(activities);
           
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            // return await _context.Activities.FindAsync(id);
            var result = await Mediator.Send(new Details.Query{ Id = id});

          return HandleResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody] Activity activity){
            return HandleResult(await Mediator.Send(new Create.Command{Activity = activity}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActivity(Guid id,[FromBody] Activity activity){
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteActivity(Guid id){
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

    }
}