using AutoMapper;
using Domain;

namespace Application.Core
{
    public class Profiles : Profile
    {
        public Profiles()
        {
            CreateMap<Activity, Activity>();
        }
    }
}
