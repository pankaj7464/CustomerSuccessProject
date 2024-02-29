import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router:Router){
  }

  navigateTo(path: any) {
    this.router.navigate([path]);
  }
  showFiller = false;
  Navigations = [
    { path: 'project-manager', displayName: 'Project Manager' },
    { path: 'placeholder', displayName: 'Placeholder' }

  ];
  tabs: { path: string, displayName: string }[] = [
    { path: 'audit-history', displayName: 'Audit History' },
    { path: 'sprint', displayName: 'Sprint' },
    { path: 'stakeholder', displayName: 'Stakeholder' },
    { path: 'version-history', displayName: 'Version History' },
    { path: 'project-budget', displayName: 'Project Budget' },
    { path: 'escalation-matrix', displayName: 'Escalation Matrix' },
    { path: 'risk-profiling', displayName: 'Risk Profiling' },
    { path: 'phase-milestone', displayName: 'Phase Milestone' },
  ]
  title = 'CustomerSuccessPlatformClient';
}
