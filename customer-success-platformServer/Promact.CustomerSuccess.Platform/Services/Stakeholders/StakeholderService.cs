using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Promact.CustomerSuccess.Platform.Services.Emailing; // Import the email service namespace
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services.Stakeholders
{
    public class StakeholderService : CrudAppService<Stakeholder,
                                StakeholderDto,
                                Guid,
                                PagedAndSortedResultRequestDto,
                                CreateStakeholderDto,
                                UpdateStakeholderDto>,
                                IStakeholderService
    {
        private readonly IEmailService _emailService;
        private readonly string Useremail = "pankajkumarnikk@gmail.com";
        private readonly string Username = "Pankaj Kumar"; 

        public StakeholderService(IRepository<Stakeholder, Guid> stakeholderRepository, IEmailService emailService) : base(stakeholderRepository)
        {
            _emailService = emailService;
        }

        public override async Task<StakeholderDto> CreateAsync(CreateStakeholderDto input)
        {
            var stakeholderDto = await base.CreateAsync(input);

            var emailDto = new EmailDto
            {
                To = Useremail,
                Subject = "Stakeholder Created alert",
                Body = Template.GetEmailTemplate(Username)
            };
            _emailService.SendEmail(emailDto);

            return stakeholderDto;
        }

        public override async Task<StakeholderDto> UpdateAsync(Guid id, UpdateStakeholderDto input)
        {
            var stakeholderDto = await base.UpdateAsync(id, input);

            var emailDto = new EmailDto
            {
                To = Useremail,
                Subject = "Stakeholder Updated alert",
                Body = Template.GetEmailTemplate(Username)
            };
            _emailService.SendEmail(emailDto);

            return stakeholderDto;
        }

        public override async Task DeleteAsync(Guid id)
        {
            var emailDto = new EmailDto
            {
                To = Useremail,
                Subject = "Stakeholder Deleted alert",
                Body = Template.GetEmailTemplate(Username)
            };
            _emailService.SendEmail(emailDto);

            await base.DeleteAsync(id);
        }
    }
}
