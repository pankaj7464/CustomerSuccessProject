namespace Promact.CustomerSuccess.Platform.Entities
{
    public class CreateEscalationMatrix
    {
        public EscalationMatrixLevels Level { get; set; }
        public EscalationType EscalationType { get; set; }
        public Guid ProjectId { get; set; }
    }
}
