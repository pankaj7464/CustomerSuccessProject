using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services.Resource
{
    public class ResourceService : CrudAppService<Resources, ResourcesDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateResourcesDto, CreateUpdateResourcesDto>
    {
        public ResourceService(IRepository<Resources, Guid> repository) : base(repository)
        {
        }
    }
}
