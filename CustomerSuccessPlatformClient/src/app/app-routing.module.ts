import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditHistoryComponent } from './pages/audit-history/audit-history.component';
import { SprintComponent } from './pages/sprint/sprint.component';
import { StakeholderComponent } from './pages/stakeholder/stakeholder.component';
import { VersionHistoryComponent } from './pages/version-history/version-history.component';
import { ProjectBudgetComponent } from './pages/project-budget/project-budget.component';
import { EscalationMatrixComponent } from './pages/escalation-matrix/escalation-matrix.component';
import { RiskProfileComponent } from './pages/risk-profiling/risk-profiling.component';
import { PhaseMilestoneComponent } from './pages/phase-milestone/phase-milestone.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './services/AuthGuard';
import { ResourcesComponent } from './pages/resources/resources.component';
import { ClientFeedbackComponent } from './pages/client-feedback/client-feedback.component';
import { ApprovedTeamComponent } from './pages/approved-team/approved-team.component';
import { ProjectUpdateComponent } from './pages/project-update/project-update.component';
import { MinuteMeetingComponent } from './pages/minute-meeting/minute-meeting.component';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectIdGuard } from './services/ProjectIdGuard';

const routes: Routes = [
  { path: "login", component: LoginComponent },

  {
    path: 'dashboard',
    // canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      { path: 'project', component: ProjectComponent },
      { path: 'audit-history', component: AuditHistoryComponent ,canActivate: [ProjectIdGuard]},
      { path: 'sprint', component: SprintComponent },
      { path: 'stakeholder', component: StakeholderComponent },
      { path: 'version-history', component: VersionHistoryComponent },
      { path: 'project-budget', component: ProjectBudgetComponent },
      { path: 'escalation-matrix', component: EscalationMatrixComponent },
      { path: 'risk-profiling', component: RiskProfileComponent },
      { path: 'phase-milestone', component: PhaseMilestoneComponent },
      { path: 'resources', component: ResourcesComponent },
      { path: 'client-feedback', component: ClientFeedbackComponent },
      { path: 'approved-team', component: ApprovedTeamComponent },
      { path: 'project-update', component: ProjectUpdateComponent },
      { path: 'minute-meeting', component: MinuteMeetingComponent },
      { path: '**', redirectTo: '/dashboard/audit-history', pathMatch: 'full' }
    ]
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
