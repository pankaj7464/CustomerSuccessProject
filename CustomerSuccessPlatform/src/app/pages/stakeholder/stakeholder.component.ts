import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-stakeholder-table',
  templateUrl: './stakeholder.component.html',
  styleUrls: ['./stakeholder.component.css']
})
export class StakeholderComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'name', 'contact'];
  dataSource!: MatTableDataSource<any>;

  constructor() { }

  ngOnInit() {
    // Dummy JSON data
    const jsonData = [
      { id: '1', title: 'Title A', name: 'John Doe', contact: 'john@example.com' },
      { id: '2', title: 'Title B', name: 'Jane Doe', contact: 'jane@example.com' }
    ];

    this.dataSource = new MatTableDataSource(jsonData);
  }
}
