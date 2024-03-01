import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-stakeholder-table',
  templateUrl: './stakeholder.component.html',
  styleUrls: ['./stakeholder.component.css']
})
export class StakeholderComponent implements OnInit {
  displayedColumns: string[] = ['title', 'name', 'contact'];
  dataSource!: any[];
  constructor(private apiService:ApiService) { }

  ngOnInit() {
    this.apiService.getAllAuditHistory().subscribe(res=>{
      this.dataSource = res.items;
    })
  }
}
