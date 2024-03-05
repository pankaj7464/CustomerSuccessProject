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

const routes: Routes = [
  { path: 'audit-history', component: AuditHistoryComponent },
  { path: 'sprint', component: SprintComponent },
  { path: 'stakeholder', component: StakeholderComponent },
  { path: 'version-history', component: VersionHistoryComponent },
  { path: 'project-budget', component: ProjectBudgetComponent },
  { path: 'escalation-matrix', component: EscalationMatrixComponent },
  { path: 'risk-profiling', component: RiskProfileComponent },
  { path: 'phase-milestone', component: PhaseMilestoneComponent },

  { path: '', redirectTo: '/audit-history', pathMatch: 'full' }, // Default redirect to audit-history
  { path: '**', redirectTo: '/audit-history', pathMatch: 'full' } // Wildcard route for undefined routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
