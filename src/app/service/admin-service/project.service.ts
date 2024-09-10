import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../models/admin-models/project';



@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:8083/api/projects';

  constructor(private http: HttpClient) {}



  getAllProjects():Observable<any> {
    return this.http.get(`${this.baseUrl}/allWithUserId`);
  }

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

  updateProject(projectId: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/update/${projectId}`, project);
  }

  deleteProject(projectId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${projectId}`);
  }

  getProjectByProjectId(projectId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/project/${projectId}`)
  }

  getAllProjectIds(): Observable<any> {
    return this.http.get<number[]>(`${this.baseUrl}/allProjectIds`);
  }

}
