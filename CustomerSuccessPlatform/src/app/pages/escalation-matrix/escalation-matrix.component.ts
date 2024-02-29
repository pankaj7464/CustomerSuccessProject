import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-escalation-matrix-table',
  templateUrl: './escalation-matrix.component.html',
  styleUrls: ['./escalation-matrix.component.css']
})
export class EscalationMatrixComponent implements OnInit {
  displayedColumns: string[] = ['id', 'level', 'escalationType', 'projectId', 'projectName'];
  dataSource!: MatTableDataSource<any>;

  constructor() { }

  ngOnInit() {
    // Dummy JSON data
    const jsonData = [
      { id: '1', level: 'High', escalationType: 'Critical', projectId: '123', projectName: 'Project A' },
      { id: '2', level: 'Medium', escalationType: 'Normal', projectId: '456', projectName: 'Project B' }
    ];

    this.dataSource = new MatTableDataSource(jsonData);
  }
}
