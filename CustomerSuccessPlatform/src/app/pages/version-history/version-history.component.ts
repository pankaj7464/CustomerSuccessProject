import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  form: FormGroup;
  editDataId!:string;

  constructor(private apiService: ApiService,private fb:FormBuilder) {
    this.form = this.fb.group({
      version: ['', Validators.required],
      type: ['', Validators.required],
      change: ['', Validators.required],
      changeReason: ['', Validators.required],
      createdBy: ['', Validators.required],
      revisionDate: ['', Validators.required],
      approvalDate: ['', Validators.required],
      approvedBy: ['', Validators.required]
    });

  }

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

  submitForm(){
    console.log('Submit', this.form.value)
    if (this.form.valid) {
      console.log(this.form.value);
    if(this.editDataId){
      this.apiService.updateVersionHistory(this.editDataId,this.form.value).subscribe((res) => {
        console.log(res);
        this.apiService.showSuccessToast(
          'Version History Updated Successfully'
        );
      });
    }
    else{
      this.apiService.postVersionHistory(this.form.value).subscribe((res) => {
        console.log(res);
        this.apiService.showSuccessToast(
          'Version History Added Successfully'
        );
      });
    }
    } else {
      this.form.markAllAsTouched();
    }
  }

  editItem(data: any) {
    this.editDataId = data.id
    this.form.patchValue(data);
  }
}
