import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-version-history-table',
  templateUrl: './version-history.component.html',
  styleUrls: ['./version-history.component.css']
})
export class VersionHistoryComponent implements OnInit {
  displayedColumns: string[] = ['version', 'type', 'change', 'changeReason', 'createdBy', 'revisionDate', 'approvalDate', 'approvedBy'];
  dataSource!:any[];

  constructor(private apiService:ApiService) { }

  ngOnInit() {
    this.apiService.getAllAuditHistory().subscribe(res=>{
      console.log(res)
      this.dataSource = res.items;
    })
  }
}
