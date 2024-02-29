
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services.PhaseMilestones
{
    public class PhaseMilestoneService : CrudAppService<PhaseMilestone, PhaseMilestoneDto, Guid,
        PagedAndSortedResultRequestDto, CreatePhaseMilestoneDto, UpdatePhaseMilestoneDto>, IPhaseMilestoneService
    {
        public PhaseMilestoneService(IRepository<PhaseMilestone, Guid> repository) : base(repository)
        {
        }
    }
}
