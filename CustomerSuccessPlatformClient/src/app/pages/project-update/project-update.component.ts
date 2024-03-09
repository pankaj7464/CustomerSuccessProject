import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService, Role } from '../../services/authorization.service';
export interface ProjectUpdate {
  date: Date;
  generalUpdate: string;
}

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrl: './project-update.component.css'
})
export class ProjectUpdateComponent {
  dataSource: ProjectUpdate[] = [
    { date: new Date('2023-01-15'), generalUpdate: 'Some general update details' },
    { date: new Date('2023-02-20'), generalUpdate: 'More general update details' },
    // Add more data objects as needed
  ];

  displayedColumns: string[] = ['date', 'generalUpdate', 'action'];
  form!: FormGroup;

  constructor(private fb: FormBuilder,private authorizationService:AuthorizationService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      date: ['', Validators.required],
      generalUpdate: ['', Validators.required],
      action: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.form.valid) {
      // Submit the form data
      console.log(this.form.value);
    } else {
      // Mark all fields as touched to trigger validation messages
   
    }
  }
  editItem(data: any) {

    // this.editDataId = data.id;

    this.form.patchValue(data);
  }
  deleteItem(id: any) {
    // this.apiService.deleteEscalationMatrix(id).subscribe(
    //   (res) => {
    //     this.getAllEscalationMatrix()
    //     this.apiService.showSuccessToast('Deleted Successfully');
    //   },
    //   (error) => {
    //     this.apiService.showSuccessToast('Error deleting ' + id + ': ' + error);
    //   }
    // );
  }

  isManager(): boolean {
    const userRole = this.authorizationService.getCurrentUser()?.role;
    return userRole === Role.Manager || userRole === Role.Admin;
  }

}
