import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-version-history-table',
  templateUrl: './version-history.component.html',
  styleUrls: ['./version-history.component.css'],
})
export class VersionHistoryComponent implements OnInit {
  displayedColumns: string[] = [
    'version',
    'type',
    'change',
    'changeReason',
    'createdBy',
    'revisionDate',
    'approvalDate',
    'approvedBy',
    'Actions',
  ];
  dataSource!: any[];
  form: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAllVersionHistory().subscribe((res) => {
      console.log(res);
      this.dataSource = res.items;
    });
  }

  deleteItem(id: any) {
    this.apiService.deleteVersionHistory(id).subscribe(
      (res) => {
        this.apiService.showSuccessToast('Deleted Successfully');
      },
      (error) => {
        this.apiService.showSuccessToast('Error deleting ' + id + ': ' + error);
      }
    );
  }
  editItem(data: any) {
    this.form.patchValue(data);
  }
}
