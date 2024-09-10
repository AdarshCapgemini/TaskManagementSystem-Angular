import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:8083/api/projects';

  constructor(private http: HttpClient) {}

  createProject(projectData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/post`, projectData);
  }

  getProjectByUserId(userId:number): Observable<any>{
    return this.http.get(`${this.baseUrl}/byuserId/${userId}`);
  }

  
  

  getOngoingProjects(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ongoing`);
  }

  getProjectsByDateRange(startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/date-range/${startDate}/${endDate}`);
  }

  getProjectsByUserRole(roleName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user-role/${roleName}`);
  }

  getProjectsByStatus(status: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/status/${status}`);
  }

  getHighPriorityTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/high-priority-tasks`);
  }

  updateProject(projectId: number, projectData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${projectId}`, projectData);
  }

  deleteProject(projectId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${projectId}`);
  }
}
