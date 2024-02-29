import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-phase-milestone-table',
  templateUrl: './phase-milestone.component.html',
  styleUrls: ['./phase-milestone.component.css']
})
export class PhaseMilestoneComponent implements OnInit {
  displayedColumns: string[] = ['id', 'projectId', 'title', 'startDate', 'endDate', 'description', 'comments', 'status'];
  dataSource!: MatTableDataSource<any>;

  constructor() { }

  ngOnInit() {
    // Dummy JSON data
    const jsonData = [
      { id: '1', projectId: '123', title: 'Title A', startDate: new Date('2024-02-28T08:00:00Z'), endDate: new Date('2024-03-10T17:00:00Z'), description: 'Description A', comments: 'Comments A', status: 'Active' },
      { id: '2', projectId: '456', title: 'Title B', startDate: new Date('2024-03-11T08:00:00Z'), endDate: new Date('2024-03-25T17:00:00Z'), description: 'Description B', comments: 'Comments B', status: 'Inactive' }
    ];

    this.dataSource = new MatTableDataSource(jsonData);
  }
}
