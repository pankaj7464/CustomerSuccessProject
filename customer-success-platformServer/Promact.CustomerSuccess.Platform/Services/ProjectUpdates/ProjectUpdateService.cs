using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services.ProjectUpdates
{
    public class ProjectUpdateService : CrudAppService<ProjectUpdate, ProjectUpdateDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateProjectUpdateDto, CreateUpdateProjectUpdateDto>, IProjectUpdateService
    {
        public ProjectUpdateService(IRepository<ProjectUpdate, Guid> repository) : base(repository)
        {
        }
    }
}
