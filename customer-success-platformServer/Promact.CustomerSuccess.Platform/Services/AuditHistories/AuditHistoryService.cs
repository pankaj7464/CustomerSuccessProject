using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Promact.CustomerSuccess.Platform.Services.Emailing; // Import the email service namespace
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services.AuditHistories
{
    public class AuditHistoryService : CrudAppService<AuditHistory,
                       AuditHistoryDto,
                       Guid,
                       PagedAndSortedResultRequestDto,
                       CreateAuditHistoryDto,
                       UpdateAuditHistoryDto>,
                       IAuditHistoryService
    {
        private readonly IEmailService _emailService;
        private readonly string Useremail ;
        private readonly string Username; 

        public AuditHistoryService(IRepository<AuditHistory, Guid> auditHistoryRepository, IEmailService emailService)
            : base(auditHistoryRepository)
        {
            _emailService = emailService;
            this.Useremail = Template.Useremail;
            this.Username = Template.Username;
        }

        public override async Task<AuditHistoryDto> CreateAsync(CreateAuditHistoryDto input)
        {
            var auditHistoryDto = await base.CreateAsync(input);

            var emailDto = new EmailDto
            {
                To = Useremail,
                Subject = "Audit History Created alert",
                Body = Template.GetEmailTemplate(Username) 
            };
            _emailService.SendEmail(emailDto);

            return auditHistoryDto;
        }

        public override async Task<AuditHistoryDto> UpdateAsync(Guid id, UpdateAuditHistoryDto input)
        {
            var auditHistoryDto = await base.UpdateAsync(id, input);

            var emailDto = new EmailDto
            {
                To = Useremail,
                Subject = "Audit History Updated alert",
                Body = Template.GetEmailTemplate(Username)
            };
            _emailService.SendEmail(emailDto);

            return auditHistoryDto;
        }

        public override async Task DeleteAsync(Guid id)
        {
            var emailDto = new EmailDto
            {
                To = Useremail,
                Subject = "Audit History Deleted alert",
                Body = Template.GetEmailTemplate(Username)
            };
            _emailService.SendEmail(emailDto);

            await base.DeleteAsync(id);
        }
    }
}
