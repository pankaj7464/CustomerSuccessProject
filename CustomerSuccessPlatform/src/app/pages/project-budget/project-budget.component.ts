import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-project-budget-table',
  templateUrl: './project-budget.component.html',
  styleUrls: ['./project-budget.component.css']
})
export class ProjectBudgetComponent implements OnInit {
  displayedColumns: string[] = ['id', 'type', 'durationInMonths', 'contractDuration', 'budgetedHours', 'budgetedCost', 'currency', 'projectId'];
  dataSource!: MatTableDataSource<any>;

  constructor() { }

  ngOnInit() {
    // Dummy JSON data
    const jsonData = [
      { id: '1', type: 'Type A', durationInMonths: 12, contractDuration: 24, budgetedHours: 100, budgetedCost: 5000, currency: 'USD', projectId: '123' },
      { id: '2', type: 'Type B', durationInMonths: 6, contractDuration: 12, budgetedHours: 50, budgetedCost: 3000, currency: 'EUR', projectId: '456' }
    ];

    this.dataSource = new MatTableDataSource(jsonData);
  }
}
