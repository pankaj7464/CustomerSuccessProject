import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService, Role } from '../../services/authorization.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
export interface MeetingMinute {
  meetingDate: Date;
  moMLink: string;
  comments: string;
}

@Component({
  selector: 'app-minute-meeting',
  templateUrl: './minute-meeting.component.html',
  styleUrl: './minute-meeting.component.css'
})
export class MinuteMeetingComponent {
  dataSource: MeetingMinute[] = [
    { meetingDate: new Date('2023-01-15'), moMLink: 'https://example.com/mom', comments: 'Some comments' },
    { meetingDate: new Date('2023-02-20'), moMLink: 'https://example.com/mom2', comments: 'More comments' },

  ];

  displayedColumns: string[] = ['meetingDate', 'moMLink', 'comments', 'action'];
  form!: FormGroup;

  constructor(private apiService:ApiService,private route:ActivatedRoute,private fb: FormBuilder, private authorizationService: AuthorizationService) { 
    let id = localStorage.getItem('projectId');
    if(id) {
      this.projectId = id;
      this.getMoMs(this.projectId)
    }

    this.form = this.fb.group({
      meetingDate: ['', Validators.required],
      moMLink: ['', Validators.required],
      comments: ['', Validators.required],
      projectId:[id||'',Validators.required]
    });
  }

 

  projectId!: string;
  ngOnInit() {

  }
  getMoMs(projectId: string) {
    this.apiService.getMeetingMenute(projectId).subscribe((res) => {
      this.dataSource = res;
    });
  }

  submitForm() {
    if (this.form.valid) {
      this.apiService.postMeetingMenute(this.form.value).subscribe(res=> {
        this.apiService.showSuccessToast("Meeting Menute added successfully")
        this
      });
      console.log(this.form.value);
    } else {

    }

  }

  editItem(data: any) {

    // this.editDataId = data.id;

    this.form.patchValue(data);
  }
  deleteItem(id: any) {
    this.apiService.deleteEscalationMatrix(id).subscribe(
      (res) => {
        this.getMoMs(this.projectId)
        this.apiService.showSuccessToast('Deleted Successfully');
      },
      (error) => {
        this.apiService.showSuccessToast('Error deleting ' + id + ': ' + error);
      }
    );
  }

  isManager(): boolean {
    const userRole = this.authorizationService.getCurrentUser()?.role;
    return userRole === Role.Manager || userRole === Role.Admin;
  }
}