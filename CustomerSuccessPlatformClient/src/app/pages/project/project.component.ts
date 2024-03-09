import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService, Role } from '../../services/authorization.service';
export interface Project {
  name: string;
  description: string;
}
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  form!: FormGroup;
  dataSource: Project[] = [
    { name: 'Project 1', description: 'Description for Project 1' },
    { name: 'Project 2', description: 'Description for Project 2' },
  ];

  displayedColumns: string[] = ['name', 'description', 'action'];
  constructor(private fb: FormBuilder, private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      action: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.form.valid) {
      // Submit the form data
      console.log(this.form.value);
    } else {

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

  isAuditor(): boolean {
    const userRole = this.authorizationService.getCurrentUser()?.role;
    console.log(userRole === Role.Auditor || userRole === Role.Admin);
    return userRole === Role.Auditor || userRole === Role.Admin;
  }
}
