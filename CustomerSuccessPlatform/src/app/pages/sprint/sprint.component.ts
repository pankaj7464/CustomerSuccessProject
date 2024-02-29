import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-sprint-table',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  displayedColumns: string[] = ['id', 'phaseMilestoneId', 'startDate', 'endDate', 'status', 'comments', 'goals', 'sprintNumber'];
  dataSource!: MatTableDataSource<any>;

  constructor() { }

  ngOnInit() {
    // Dummy JSON data
    const jsonData = [
      { id: '1', phaseMilestoneId: '123', startDate: new Date('2024-02-28T08:00:00Z'), endDate: new Date('2024-03-10T17:00:00Z'), status: 'Active', comments: 'Some comments', goals: 'Some goals', sprintNumber: 1 },
      { id: '2', phaseMilestoneId: '456', startDate: new Date('2024-03-11T08:00:00Z'), endDate: new Date('2024-03-25T17:00:00Z'), status: 'Inactive', comments: 'More comments', goals: 'More goals', sprintNumber: 2 }
    ];

    this.dataSource = new MatTableDataSource(jsonData);
  }
}
