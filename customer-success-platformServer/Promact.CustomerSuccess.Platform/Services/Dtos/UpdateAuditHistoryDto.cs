namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateAuditHistoryDto
    {
   
        public DateTime DateOfAudit { get; set; }
        public Guid ReviewedBy { get; set; }
        public SprintStatus Status { get; set; }
        public string ReviewedSection { get; set; }
        public string? CommentOrQueries { get; set; }
        public string? ActionItem { get; set; }
    }
}
