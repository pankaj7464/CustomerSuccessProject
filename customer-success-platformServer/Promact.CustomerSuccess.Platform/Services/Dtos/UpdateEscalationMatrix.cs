namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateEscalationMatrix
    {
        public EscalationMatrixLevels Level { get; set; }
        public EscalationType EscalationType { get; set; }
        public string ResponsiblePerson { get; set; }
        public Guid ProjectId { get; set; }
    }
}
