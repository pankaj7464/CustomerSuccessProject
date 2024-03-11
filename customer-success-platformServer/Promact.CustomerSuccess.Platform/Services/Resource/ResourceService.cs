using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Promact.CustomerSuccess.Platform.Services.Emailing;

namespace Promact.CustomerSuccess.Platform.Services.Resource
{
    public class ResourceService : CrudAppService<Resources, ResourcesDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateResourcesDto, CreateUpdateResourcesDto>
    {
        private readonly IEmailService _emailService;
        private readonly string Useremail;
        private readonly string Username;
        private readonly IRepository<Resources, Guid> _resourceRepository;

        public ResourceService(IRepository<Resources, Guid> repository, IEmailService emailService) : base(repository)
        {
            _emailService = emailService;
            _resourceRepository = repository;
            // Initialize Useremail and Username here if needed
        }

        public override async Task<ResourcesDto> CreateAsync(CreateUpdateResourcesDto input)
        {
            var resourceDto = await base.CreateAsync(input);

            // Send email notification
            var emailDto = new EmailDto
            {
                To = Useremail,
                Subject = "Resource Created Alert",
                Body = $"Resource with ID {resourceDto.Id} has been created."
            };
            _emailService.SendEmail(emailDto);

            return resourceDto;
        }

        public override async Task<ResourcesDto> UpdateAsync(Guid id, CreateUpdateResourcesDto input)
        {
            var resourceDto = await base.UpdateAsync(id, input);

            // Send email notification
            var emailDto = new EmailDto
            {
                To = Useremail,
                Subject = "Resource Updated Alert",
                Body = $"Resource with ID {resourceDto.Id} has been updated."
            };
            _emailService.SendEmail(emailDto);

            return resourceDto;
        }

        public override async Task DeleteAsync(Guid id)
        {
            // Retrieve resource to get details before deletion
            var resource = await _resourceRepository.GetAsync(id);

            // Perform deletion
            await base.DeleteAsync(id);

            // Send email notification
            var emailDto = new EmailDto
            {
                To = Useremail,
                Subject = "Resource Deleted Alert",
                Body = $"Resource with ID {id} and Name '{resource.Name}' has been deleted."
            };
            _emailService.SendEmail(emailDto);
        }

        public async Task<List<ResourcesDto>> GetResourcesByProjectIdAsync(Guid projectId)
        {
            var resources = await _resourceRepository.GetListAsync(r => r.ProjectId == projectId);
            return ObjectMapper.Map<List<Resources>, List<ResourcesDto>>(resources);
        }
    }
}
