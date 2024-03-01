import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ProjectBudget } from '../../models/project-budget';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-audit-history',
  templateUrl: './audit-history.component.html',
  styleUrl: './audit-history.component.css'
})
export class AuditHistoryComponent {
  displayedColumns: string[] = ['dateOfAudit', 'reviewedBy', 'status', 'reviewedSection', 'commentOrQueries', 'actionItem'];
  dataSource!: ProjectBudget[];
  statuses:string[] = ["Pending","Done"];
  form: FormGroup;

  constructor(private apiService:ApiService,private fb: FormBuilder) {
    this.form = this.fb.group({
      dateOfAudit: ['', Validators.required],
      reviewedBy: ['', Validators.required],
      status: ['', Validators.required],
      reviewedSection: ['', Validators.required],
      commentOrQueries: ['', Validators.required],
      actionItem: ['', Validators.required]
    });
 }

 
  ngOnInit() {
    this.apiService.getAllAuditHistory().subscribe(res=>{
      this.dataSource = res.items;
    })
  }


  submitForm(): void {
    if (this.form.valid) {
      
      console.log(this.form.value);
     
    } else {
     
      this.form.markAllAsTouched();
    }
  }


  
}
