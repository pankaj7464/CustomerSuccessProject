import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-version-history-table',
  templateUrl: './version-history.component.html',
  styleUrls: ['./version-history.component.css']
})
export class VersionHistoryComponent implements OnInit {
  displayedColumns: string[] = ['version', 'type', 'change', 'changeReason', 'createdBy', 'revisionDate', 'approvalDate', 'approvedBy'];
  dataSource!: MatTableDataSource<any>;

  constructor() { }

  ngOnInit() {
    // Dummy JSON data
    const jsonData = [
      { version: 1, type: 'Type A', change: 'Change A', changeReason: 'Reason A', createdBy: 'User A', revisionDate: new Date('2024-02-28T10:00:00Z'), approvalDate: new Date('2024-02-28T11:00:00Z'), approvedBy: 'User B' },
      { version: 2, type: 'Type B', change: 'Change B', changeReason: 'Reason B', createdBy: 'User C', revisionDate: new Date('2024-02-28T12:00:00Z'), approvalDate: null, approvedBy: '' }
    ];

    this.dataSource = new MatTableDataSource(jsonData);
  }
}
