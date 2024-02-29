namespace Promact.CustomerSuccess.Platform.Services.Emailing
{
    public interface IEmailService
    {
        public interface IEmailServices
        {
            void SendEmail(EmailDto request);
        }
    }
}
