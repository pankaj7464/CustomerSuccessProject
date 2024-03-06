import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, forkJoin, of, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = `${environment.apiUrl}/api/app/`;
  private loadingSubject: Subject<boolean> = new Subject<boolean>();


  escalationType: string[] = ['Operational', ' Financial', 'Technical'];
  levels: string[] = ['Level1', 'Level2', 'Level3', 'Level4', 'Level5'];
  phaseMilestoneStatus: string[] = [
    'NotStarted',
    'InProgress',
    'Completed',
    'OnHold',
    'Cancelled',
    'Deferred',
    'Delayed',
    'OnTrack',
    'SignOffPending',
    'InvoicePending',
    'PaymentPending',
    'PaymentReceived',
    'PaymentDelayed',
  ];
  projectType: string[] = ['FixedBidget', 'ManMonth']

  riskTypes: string[] = [
    'Financial',
    'Operational',
    'Technical',
    'HumanResource',
    'External',
    'Legal',
    'Reputational',
  ];
  severities: string[] = ['Low', 'Medium', 'High'];
  impacts: string[] = ['Low', 'Medium', 'High'];
  sprintStatuses: string[] = [
    "InProgress",
    "Completed",
    "Delayed",
    "OnTrack",
    "SignOffPending"
  ];
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { 
  }

 
  private showLoader(): void {
    this.loadingSubject.next(true);
  }
  
  private hideLoader(): void {
    this.loadingSubject.next(false);
  }
  isLoading(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  showSuccessToast(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['success-snackbar'],
    });
  }

  // Update API services

  deleteAuditHistory(id: string): Observable<any> {
    this.showLoader();
    return this.http
      .delete<any>(this.apiUrl + 'audit-history/' + id, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  deleteVersionHistory(id: string): Observable<any> {
    this.showLoader();
    return this.http
      .delete<any>(this.apiUrl + 'version-history/' + id, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  deleteEscalationMatrix(id: string): Observable<any> {
    this.showLoader();
    return this.http
      .delete<any>(this.apiUrl + 'escalation-matrix/' + id, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  deletePhaseMilestone(id: string): Observable<any> {
    this.showLoader();
    return this.http
      .delete<any>(this.apiUrl + 'phase-milestone/' + id, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  deleteProjectBudget(id: string): Observable<any> {
    this.showLoader();
    return this.http
      .delete<any>(this.apiUrl + 'project-budget/' + id, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  deleteRiskProfile(id: string): Observable<any> {
    this.showLoader();
    return this.http
      .delete<any>(this.apiUrl + 'risk-profile/' + id, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  deleteSprint(id: string): Observable<any> {
    this.showLoader();
    return this.http
      .delete<any>(this.apiUrl + 'sprint/' + id, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  deleteStakeholder(id: string): Observable<any> {
    this.showLoader();
    return this.http
      .delete<any>(this.apiUrl + 'stakeholder/' + id, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }

  // Update API services

  updateAuditHistory(id: string, data: any): Observable<any> {
    this.showLoader();
    return this.http
      .put<any>(this.apiUrl + 'audit-history/' + id, data, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  updateVersionHistory(id: string, data: any): Observable<any> {
    this.showLoader();
    return this.http
      .put<any>(this.apiUrl + 'version-history/' + id, data, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  updateEscalationMatrix(id: string, data: any): Observable<any> {
    this.showLoader();
    return this.http
      .put<any>(this.apiUrl + 'escalation-matrix/' + id, data, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  updatePhaseMilestone(id: string, data: any): Observable<any> {
    this.showLoader();
    return this.http
      .put<any>(this.apiUrl + 'phase-milestone/' + id, data, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  updateProjectBudget(id: string, data: any): Observable<any> {
    this.showLoader();
    return this.http
      .put<any>(this.apiUrl + 'project-budget/' + id, data, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  updateRiskProfile(id: string, data: any): Observable<any> {
    this.showLoader();
    return this.http
      .put<any>(this.apiUrl + 'risk-profile/' + id, data, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  updateSprint(id: string, data: any): Observable<any> {
    this.showLoader();
    return this.http
      .put<any>(this.apiUrl + 'sprint/' + id, data, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  updateStakeholder(id: string, data: any): Observable<any> {
    this.showLoader();
    return this.http
      .put<any>(this.apiUrl + 'stakeholder/' + id, data, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }

  // Post API Services
  postAuditHistory(data: any): Observable<any> {
    console.log(data);
    this.showLoader();
    return this.http
      .post<any>(this.apiUrl + 'audit-history', data, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  postVersionHistory(data: any): Observable<any> {
    this.showLoader();
    return this.http
      .post<any>(this.apiUrl + 'version-history', data, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  postEscalationMatrix(data: any): Observable<any> {
    this.showLoader();
    return this.http
      .post<any>(this.apiUrl + 'escalation-matrix', data, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  postPhaseMilestone(data: any): Observable<any> {
    this.showLoader();
    return this.http
      .post<any>(this.apiUrl + 'phase-milestone', data, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  postProjectBudget(data: any): Observable<any> {
    this.showLoader();
    return this.http
      .post<any>(this.apiUrl + 'project-budget', data, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  postRiskProfile(data: any): Observable<any> {
    this.showLoader();
    return this.http
      .post<any>(this.apiUrl + 'risk-profile', data, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  postSprint(data: any): Observable<any> {
    this.showLoader();
    return this.http
      .post<any>(this.apiUrl + 'sprint', data, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  postStakeholder(data: any): Observable<any> {
    this.showLoader();
    return this.http
      .post<any>(this.apiUrl + 'stakeholder', data, {
        responseType: 'text' as 'json',
      })
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }

  // Get API Service
  getProjectBudgets(): Observable<ApiResponse> {
    this.showLoader();
    return this.http
      .get<ApiResponse>(this.apiUrl + 'project-budget')
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  getAllAuditHistory(): Observable<ApiResponse> {
    this.showLoader();
    return this.http
      .get<ApiResponse>(this.apiUrl + 'audit-history')
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  getAllVersionHistory(): Observable<ApiResponse> {
    this.showLoader();
    return this.http
      .get<ApiResponse>(this.apiUrl + 'version-history')
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  getAllStakeholder(): Observable<ApiResponse> {
    this.showLoader();
    return this.http
      .get<ApiResponse>(this.apiUrl + 'stakeholder')
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }

  getAllPhaseMilestone(): Observable<ApiResponse> {
    this.showLoader();
    return this.http
      .get<ApiResponse>(this.apiUrl + 'phase-milestone')
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  getAllEscalationMatrix(): Observable<ApiResponse> {
    this.showLoader();
    return this.http
      .get<ApiResponse>(this.apiUrl + 'escalation-matrix')
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  getAllRiskProfile(): Observable<ApiResponse> {
    this.showLoader();
    return this.http
      .get<ApiResponse>(this.apiUrl + 'risk-profile')
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  getAllSprint(): Observable<ApiResponse> {
    this.showLoader();
    return this.http
      .get<ApiResponse>(this.apiUrl + 'sprint')
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }
  getAllProject(): Observable<ApiResponse> {
    this.showLoader();
    return this.http
      .get<ApiResponse>(this.apiUrl + 'project')
      .pipe(finalize(() => {
          this.hideLoader();
        }));
  }

  getAllDataForPdf(): Observable<any> {
    const apiCalls = [
      this.getProjectBudgets(),
      this.getAllAuditHistory(),
      this.getAllVersionHistory(),
      this.getAllStakeholder(),
      this.getAllPhaseMilestone(),
      this.getAllEscalationMatrix(),
      this.getAllRiskProfile(),
      this.getAllSprint()
    ];

    return forkJoin(apiCalls.map(apiCall =>
      apiCall.pipe(
        catchError(error => {
          console.error('Error fetching data:', error);
          return of(null);
        })
      )
    )).pipe(
      map(([projectBudgets, auditHistory, versionHistory, stakeholder, phaseMilestone, escalationMatrix, riskProfile, sprint]) => {
        return {
          projectBudgets,
          auditHistory,
          versionHistory,
          stakeholder,
          phaseMilestone,
          escalationMatrix,
          riskProfile,
          sprint,
        };
      }
      )
    );
  }
}
