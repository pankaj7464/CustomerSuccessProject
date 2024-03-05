import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './material.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StakeholderComponent } from './pages/stakeholder/stakeholder.component';
import { AuditHistoryComponent } from './pages/audit-history/audit-history.component';
import { ProjectBudgetComponent } from './pages/project-budget/project-budget.component';
import { VersionHistoryComponent } from './pages/version-history/version-history.component';
import { SprintComponent } from './pages/sprint/sprint.component';
import { EscalationMatrixComponent } from './pages/escalation-matrix/escalation-matrix.component';
import { RiskProfileComponent } from './pages/risk-profiling/risk-profiling.component';
import { PhaseMilestoneComponent } from './pages/phase-milestone/phase-milestone.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


// angualr material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table'


@NgModule({
  declarations: [
    AppComponent,
    StakeholderComponent,
    AuditHistoryComponent,
    ProjectBudgetComponent,
    VersionHistoryComponent,
    SprintComponent,
    EscalationMatrixComponent,
    RiskProfileComponent,
    PhaseMilestoneComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatTableModule,
    AngularMaterialModule
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
