using Castle.Core.Smtp;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Promact.CustomerSuccess.Platform.Services.Emailing;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services.Sprints
{
    public class SprintService : CrudAppService<Sprint, SprintDto, Guid,
        PagedAndSortedResultRequestDto, CreateSprintDto, UpdateSprintDto>
    {
        private readonly IEmailService _emailService;
        private readonly string Useremail;
        private readonly string Username ;
        public SprintService(IRepository<Sprint, Guid> repository,IEmailService emailService) : base(repository)
        {
            _emailService = emailService;
            this.Useremail = Template.Useremail;
            this.Username = Template.Username;
        }


        public override async Task<SprintDto> CreateAsync(CreateSprintDto input)
        {
          
            var sprintDto = await base.CreateAsync(input);

            var emailDto = new EmailDto
            {
                To = Useremail,
                Subject = "Audit Created alert",
                Body = Template.GetEmailTemplate(Username)
            };
            _emailService.SendEmail(emailDto);

            return sprintDto;
        }

        public override async Task<SprintDto> UpdateAsync(Guid id, UpdateSprintDto input)
        {
            var sprintDto = await base.UpdateAsync(id, input);

            var emailDto = new EmailDto
            {
                To =Useremail,
                Subject = "Project Updated alert",
                Body = Template.GetEmailTemplate(Username)
            };
            _emailService.SendEmail(emailDto);

            return sprintDto;
        }

        public override async Task DeleteAsync(Guid id)
        {
            // You can perform any additional operations before deleting the entity if needed
            var emailDto = new EmailDto
            {
                To = Useremail,
                Subject = "Audit deleted alert",
                Body = Template.GetEmailTemplate(Username)
            };
            _emailService.SendEmail(emailDto);

            await base.DeleteAsync(id);
        }


    }
}
