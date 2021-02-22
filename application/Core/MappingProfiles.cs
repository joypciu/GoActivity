using AutoMapper;
using domain;

namespace application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity,Activity>();
        }
    }
}