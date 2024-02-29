using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class ProjectService : CrudAppService<
                       Project, // TEntity
                       ProjectDto, // TEntityDto
                       Guid, // TKey
                       PagedAndSortedResultRequestDto, // TGetListInput
                       CreateProjectDto, // TCreateInput
                       UpdateProjectDto>, // TUpdateInput
                       IProjectService
    {
        public ProjectService(IRepository<Project, Guid> projectRepository)
            : base(projectRepository)
        {
        }
    }
}
