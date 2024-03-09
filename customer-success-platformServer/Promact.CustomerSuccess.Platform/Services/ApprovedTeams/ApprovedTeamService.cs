using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services.ApprovedTeams
{
    public class ApprovedTeamService : CrudAppService<ApprovedTeam, ApprovedTeamDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateApprovedTeamDto, CreateUpdateApprovedTeamDto>
    {
        public ApprovedTeamService(IRepository<ApprovedTeam, Guid> repository) : base(repository)
        {
        }
    }
}
