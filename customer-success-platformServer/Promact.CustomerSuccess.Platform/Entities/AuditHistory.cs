using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class AuditHistory:Entity<Guid>
    {

        public DateTime DateOfAudit { get; set; }

        [ForeignKey(nameof(ApplicationUser))]
        public Guid ReviewedBy { get; set; }
        public SprintStatus Status { get; set; }    
        public string ReviewedSection { get; set; }
        public string? CommentOrQueries { get; set; }
        public string? ActionItem { get; set; }

        [ForeignKey(nameof(Project))]
        public required Guid ProjectId { get; set; }
        public virtual Project? Project { get; set; }
    }
}
