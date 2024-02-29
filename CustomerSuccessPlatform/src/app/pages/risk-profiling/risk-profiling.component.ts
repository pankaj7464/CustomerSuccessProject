import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-risk-profile-table',
  templateUrl: './risk-profiling.component.html',
  styleUrls: ['./risk-profiling.component.css']
})
export class RiskProfileComponent implements OnInit {
  displayedColumns: string[] = ['id', 'projectId', 'riskType', 'severity', 'impact', 'remediationSteps'];
  dataSource!: MatTableDataSource<any>;

  constructor() { }

  ngOnInit() {
    // Dummy JSON data
    const jsonData = [
      { id: '1', projectId: '123', riskType: 'Type A', severity: 'High', impact: 'Critical', remediationSteps: ['Step 1', 'Step 2'] },
      { id: '2', projectId: '456', riskType: 'Type B', severity: 'Medium', impact: 'Normal', remediationSteps: ['Step 3', 'Step 4'] }
    ];

    this.dataSource = new MatTableDataSource(jsonData);
  }
}
