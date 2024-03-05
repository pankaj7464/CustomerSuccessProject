import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = `${environment.apiUrl}/api/app/`;
  private loading: boolean = false;

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
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      if (
        error.status === 400 &&
        error.headers.get('content-type')?.startsWith('text/plain')
      ) {
        // If the response is text/plain, handle it differently
        errorMessage = error.error;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    this.snackBar.open(errorMessage, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
    return throwError(errorMessage);
  }

  private showLoader(): void {
    this.loading = true;
  }

  private hideLoader(): void {
    this.loading = false;
  }

  isLoading() {
    return this.loading;
  }

  private handleLoader<T>(): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>) => {
      return source.pipe(
        catchError((error) => {
          this.hideLoader();
          return this.handleError(error);
        }),
        finalize(() => {
          this.hideLoader();
        })
      );
    };
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
      .pipe(this.handleLoader());
  }
  deleteVersionHistory(id: string): Observable<any> {
    this.showLoader();
    return this.http
      .delete<any>(this.apiUrl + 'version-history/' + id, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }
  deleteEscalationMatrix(id: string): Observable<any> {
    this.showLoader();
    return this.http
      .delete<any>(this.apiUrl + 'escalation-matrix/' + id, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }
  deletePhaseMilestone(id: string): Observable<any> {
    this.showLoader();
    return this.http
      .delete<any>(this.apiUrl + 'phase-milestone/' + id, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }
  deleteProjectBudget(id: string): Observable<any> {
    this.showLoader();
    return this.http
      .delete<any>(this.apiUrl + 'project-budget/' + id, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }
  deleteRiskProfile(id: string): Observable<any> {
    this.showLoader();
    return this.http
      .delete<any>(this.apiUrl + 'risk-profile/' + id, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }
  deleteSprint(id: string): Observable<any> {
    this.showLoader();
    return this.http
      .delete<any>(this.apiUrl + 'sprint/' + id, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }
  deleteStakeholder(id: string): Observable<any> {
    this.showLoader();
    return this.http
      .delete<any>(this.apiUrl + 'stakeholder/' + id, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }

  // Update API services

  updateAuditHistory(id: string, data: any): Observable<any> {
    this.showLoader();
    return this.http
      .put<any>(this.apiUrl + 'audit-history/' + id, data, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }
  updateVersionHistory(id: string, data: any): Observable<any> {
    this.showLoader();
    return this.http
      .put<any>(this.apiUrl + 'version-history/' + id, data, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }
  updateEscalationMatrix(id: string, data: any): Observable<any> {
    this.showLoader();
    return this.http
      .put<any>(this.apiUrl + 'escalation-matrix/' + id, data, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }
  updatePhaseMilestone(id: string, data: any): Observable<any> {
    this.showLoader();
    return this.http
      .put<any>(this.apiUrl + 'phase-milestone/' + id, data, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }
  updateProjectBudget(id: string, data: any): Observable<any> {
    this.showLoader();
    return this.http
      .put<any>(this.apiUrl + 'project-budget/' + id, data, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }
  updateRiskProfile(id: string, data: any): Observable<any> {
    this.showLoader();
    return this.http
      .put<any>(this.apiUrl + 'risk-profile/' + id, data, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }
  updateSprint(id: string, data: any): Observable<any> {
    this.showLoader();
    return this.http
      .put<any>(this.apiUrl + 'sprint/' + id, data, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }
  updateStakeholder(id: string, data: any): Observable<any> {
    this.showLoader();
    return this.http
      .put<any>(this.apiUrl + 'stakeholder/' + id, data, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }

  // Post API Services
  postAuditHistory(data: any): Observable<any> {
    console.log(data);
    this.showLoader();
    return this.http
      .post<any>(this.apiUrl + 'audit-history', data, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }
  postVersionHistory(data: any): Observable<any> {
    this.showLoader();
    return this.http
      .post<any>(this.apiUrl + 'version-history', data, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }
  postEscalationMatrix(data: any): Observable<any> {
    this.showLoader();
    return this.http
      .post<any>(this.apiUrl + 'escalation-matrix', data, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }
  postPhaseMilestone(data: any): Observable<any> {
    this.showLoader();
    return this.http
      .post<any>(this.apiUrl + 'phase-milestone', data, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }
  postProjectBudget(data: any): Observable<any> {
    this.showLoader();
    return this.http
      .post<any>(this.apiUrl + 'project-budget', data, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }
  postRiskProfile(data: any): Observable<any> {
    this.showLoader();
    return this.http
      .post<any>(this.apiUrl + 'risk-profile', data, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }
  postSprint(data: any): Observable<any> {
    this.showLoader();
    return this.http
      .post<any>(this.apiUrl + 'sprint', data, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }
  postStakeholder(data: any): Observable<any> {
    this.showLoader();
    return this.http
      .post<any>(this.apiUrl + 'stakeholder', data, {
        responseType: 'text' as 'json',
      })
      .pipe(this.handleLoader());
  }

  // Get API Service
  getProjectBudgets(): Observable<ApiResponse> {
    this.showLoader();
    return this.http
      .get<ApiResponse>(this.apiUrl + 'project-budget')
      .pipe(this.handleLoader());
  }
  getAllAuditHistory(): Observable<ApiResponse> {
    this.showLoader();
    return this.http
      .get<ApiResponse>(this.apiUrl + 'audit-history')
      .pipe(this.handleLoader());
  }
  getAllVersionHistory(): Observable<ApiResponse> {
    this.showLoader();
    return this.http
      .get<ApiResponse>(this.apiUrl + 'version-history')
      .pipe(this.handleLoader());
  }
  getAllStakeholder(): Observable<ApiResponse> {
    this.showLoader();
    return this.http
      .get<ApiResponse>(this.apiUrl + 'stakeholder')
      .pipe(this.handleLoader());
  }

  getAllPhaseMilestone(): Observable<ApiResponse> {
    this.showLoader();
    return this.http
      .get<ApiResponse>(this.apiUrl + 'phase-milestone')
      .pipe(this.handleLoader());
  }
  getAllEscalationMatrix(): Observable<ApiResponse> {
    this.showLoader();
    return this.http
      .get<ApiResponse>(this.apiUrl + 'escalation-matrix')
      .pipe(this.handleLoader());
  }
  getAllRiskProfile(): Observable<ApiResponse> {
    this.showLoader();
    return this.http
      .get<ApiResponse>(this.apiUrl + 'risk-profile')
      .pipe(this.handleLoader());
  }
  getAllSprint(): Observable<ApiResponse> {
    this.showLoader();
    return this.http
      .get<ApiResponse>(this.apiUrl + 'sprint')
      .pipe(this.handleLoader());
  }
  getAllProject(): Observable<ApiResponse> {
    this.showLoader();
    return this.http
      .get<ApiResponse>(this.apiUrl + 'project')
      .pipe(this.handleLoader());
  }

  getAllDataForPdf(): Observable<any> {
    const projectBudgets$ = this.getProjectBudgets();
    const auditHistory$ = this.getAllAuditHistory();
    const versionHistory$ = this.getAllVersionHistory();
    const stakeholder$ = this.getAllStakeholder();
    const phaseMilestone$ = this.getAllPhaseMilestone();
    const escalationMatrix$ = this.getAllEscalationMatrix();
    const riskProfile$ = this.getAllRiskProfile();
    const sprint$ = this.getAllSprint();

    return forkJoin([
      projectBudgets$,
      auditHistory$,
      versionHistory$,
      stakeholder$,
      phaseMilestone$,
      escalationMatrix$,
      riskProfile$,
      sprint$,
    ]).pipe(
      map(
        ([
          projectBudgets,
          auditHistory,
          versionHistory,
          stakeholder,
          phaseMilestone,
          escalationMatrix,
          riskProfile,
          sprint,
        ]: [
            ApiResponse,
            ApiResponse,
            ApiResponse,
            ApiResponse,
            ApiResponse,
            ApiResponse,
            ApiResponse,
            ApiResponse
          ]) => {
          console.log(
            projectBudgets,
            auditHistory,
            versionHistory,
            stakeholder,
            phaseMilestone,
            escalationMatrix,
            riskProfile,
            sprint
          );

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
