using Microsoft.AspNetCore.Authorization;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Promact.CustomerSuccess.Platform.Services.Dtos.AuditHistory;
using Promact.CustomerSuccess.Platform.Services.Emailing;
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
        private readonly IRepository<AuditHistory, Guid> _auditHistoryRepository;

        public AuditHistoryService(IRepository<AuditHistory, Guid> auditHistoryRepository, IEmailService emailService)
            : base(auditHistoryRepository)
        {
            _emailService = emailService;
            _auditHistoryRepository = auditHistoryRepository;
        }

        public override async Task<AuditHistoryDto> CreateAsync(CreateAuditHistoryDto input)
        {
            var auditHistoryDto = await base.CreateAsync(input);

            var projectId = input.ProjectId;

            var projectDetail = new EmailToStakeHolderDto
            {
                Subject = "Audit Created alert",
                Body = Template.GetAuditHistoryEmailBody(auditHistoryDto, "Created"),
                ProjectId = projectId,
            };
            Task.Run(() => _emailService.SendEmailToStakeHolder(projectDetail));

            return auditHistoryDto;
        }

        public override async Task<AuditHistoryDto> UpdateAsync(Guid id, UpdateAuditHistoryDto input)
        {
            var auditHistoryDto = await base.UpdateAsync(id, input);

            var projectId = input.ProjectId;

            var projectDetail = new EmailToStakeHolderDto
            {
                Subject = "Audit Created alert",
                Body = Template.GetAuditHistoryEmailBody(auditHistoryDto,"Updated"),
                ProjectId = projectId,

            };
            Task.Run(() => _emailService.SendEmailToStakeHolder(projectDetail));

            return auditHistoryDto;
        }
        public override async Task DeleteAsync(Guid id)
        {
            var auditnHistory = await _auditHistoryRepository.GetAsync(id);
            var projectId = auditnHistory.ProjectId;

            var projectDetail = new EmailToStakeHolderDto
            {
                Subject = "Audit History Deleted alert ",
                ProjectId = projectId,
                Body = Template.GetAuditHistoryEmailBody(ObjectMapper.Map<AuditHistory, AuditHistoryDto>(auditnHistory), "Deleted"),
            };
            Task.Run(() => _emailService.SendEmailToStakeHolder(projectDetail));

            await base.DeleteAsync(id);
        } 
        public async Task<List<AuditHistory>> GetAuditHistoriesByProjectIdAsync(Guid projectId)
        {
            return await _auditHistoryRepository.GetListAsync(ah => ah.ProjectId == projectId);
        }


    }
}
