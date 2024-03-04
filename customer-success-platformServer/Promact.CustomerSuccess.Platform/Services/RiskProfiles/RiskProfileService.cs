using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Promact.CustomerSuccess.Platform.Services.Emailing; 
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services.RiskProfiles
{
    public class RiskProfileService : CrudAppService<RiskProfile,
                                RiskProfileDto,
                                Guid,
                                PagedAndSortedResultRequestDto,
                                CreateRiskProfileDto,
                                UpdateRiskProfileDto>,
                                IRiskProfileService
    {
        private readonly IEmailService _emailService;
        private readonly string Useremail; 
        private readonly string Username;

        public RiskProfileService(IRepository<RiskProfile, Guid> repository, IEmailService emailService) : base(repository)
        {
            _emailService = emailService;
            this.Useremail = Template.Useremail;
            this.Username = Template.Username;
        }

        public override async Task<RiskProfileDto> CreateAsync(CreateRiskProfileDto input)
        {
            var riskProfileDto = await base.CreateAsync(input);

            var emailDto = new EmailDto
            {
                To = Useremail,
                Subject = "Risk Profile Created alert",
                Body = Template.GetEmailTemplate(Username) 
            };
            _emailService.SendEmail(emailDto);

            return riskProfileDto;
        }

        public override async Task<RiskProfileDto> UpdateAsync(Guid id, UpdateRiskProfileDto input)
        {
            var riskProfileDto = await base.UpdateAsync(id, input);

            var emailDto = new EmailDto
            {
                To = Useremail,
                Subject = "Risk Profile Updated alert",
                Body = Template.GetEmailTemplate(Username)
            };
            _emailService.SendEmail(emailDto);

            return riskProfileDto;
        }

        public override async Task DeleteAsync(Guid id)
        {
            var emailDto = new EmailDto
            {
                To = Useremail,
                Subject = "Risk Profile Deleted alert",
                Body = Template.GetEmailTemplate(Username)
            };
            _emailService.SendEmail(emailDto);

            await base.DeleteAsync(id);
        }
    }
}
