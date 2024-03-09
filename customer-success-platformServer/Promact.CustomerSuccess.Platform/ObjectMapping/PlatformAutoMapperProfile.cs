using AutoMapper;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;

namespace Promact.CustomerSuccess.Platform.ObjectMapping;

public class PlatformAutoMapperProfile : Profile
{
    public PlatformAutoMapperProfile()
    {
        /* Create your AutoMapper object mappings here */
        CreateMap<CreateProjectDto, Project>();
        CreateMap<UpdateProjectDto, Project>();
        CreateMap<Project, ProjectDto>().ReverseMap();


        //Done
        CreateMap<CreateStakeholderDto, Stakeholder>();
        CreateMap<UpdateStakeholderDto, Stakeholder>();
        CreateMap<Stakeholder, StakeholderDto>().ReverseMap();


        //Done
        CreateMap<CreateVersionHistoryDto, VersionHistory>();
        CreateMap<UpdateVersionHistoryDto, VersionHistory>();
        CreateMap<VersionHistory, VersionHistoryDto>().ReverseMap();


        //Done
        CreateMap<CreateAuditHistoryDto, AuditHistory>();
        CreateMap<UpdateAuditHistoryDto, AuditHistory>();
        CreateMap<AuditHistory, AuditHistoryDto>().ReverseMap();
      
        
        //Done
        CreateMap<CreateProjectBudgetDto, ProjectBudget>();
        CreateMap<UpdateProjectBudgetDto, ProjectBudget>();
        CreateMap<ProjectBudget, ProjectBudgetDto>().ReverseMap(); 
        
        //Done
        CreateMap<CreateEscalationMatrix, EscalationMatrix>();
        CreateMap<UpdateEscalationMatrix, EscalationMatrix>();
        CreateMap<EscalationMatrix, EscalationMatrixDto>().ReverseMap();
        
        
        //Done
        CreateMap<CreateRiskProfileDto, RiskProfile>();
        CreateMap<UpdateRiskProfileDto, RiskProfile>();
        CreateMap<RiskProfile, RiskProfileDto>().ReverseMap();


        //Done
        CreateMap<CreateSprintDto, Sprint>();
        CreateMap<UpdateSprintDto, Sprint>();
        CreateMap<Sprint, SprintDto>().ReverseMap();
        
        //Done
        CreateMap<CreatePhaseMilestoneDto, PhaseMilestone>();
        CreateMap<UpdatePhaseMilestoneDto, PhaseMilestone>();
        CreateMap<PhaseMilestone, PhaseMilestoneDto>().ReverseMap();



        //Pending
        CreateMap<CreateUpdateResourcesDto, Resources>();
        CreateMap<CreateUpdateResourcesDto, Resources>();
        CreateMap<Resources, ResourcesDto>().ReverseMap();
        
        //Pending
        CreateMap<CreateUpdateMeetingMinuteDto, MeetingMinute>();
        CreateMap<CreateUpdateMeetingMinuteDto, MeetingMinute>();
        CreateMap<MeetingMinute, MeetingMinuteDto>().ReverseMap();
        
        //Pending
        CreateMap<CreateUpdateApprovedTeamDto, ApprovedTeam>();
        CreateMap<CreateUpdateApprovedTeamDto, ApprovedTeam>();
        CreateMap<ApprovedTeam, ApprovedTeamDto>().ReverseMap();

        //Pending
        CreateMap<CreateUpdateProjectUpdateDto, ProjectUpdate>();
        CreateMap<CreateUpdateProjectUpdateDto, ProjectUpdate>();
        CreateMap<ProjectUpdate, ProjectUpdateDto>().ReverseMap();











    }
}
