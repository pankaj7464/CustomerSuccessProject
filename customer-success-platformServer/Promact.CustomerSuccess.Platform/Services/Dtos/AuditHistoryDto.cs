using Volo.Abp.Application.Dtos;
namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class AuditHistoryDto:IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public DateTime DateOfAudit { get; set; }
        public Guid ReviewedBy { get; set; }
        public string Status { get; set; }
        public string ReviewedSection { get; set; }
        public string? CommentOrQueries { get; set; }
        public string? ActionItem { get; set; }
    }
}
