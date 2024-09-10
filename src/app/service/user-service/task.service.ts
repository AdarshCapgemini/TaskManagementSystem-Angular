import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8083/api/tasks';
  constructor(private http: HttpClient) {}

  getTaskByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`);
  }
  getTasksOfProject(projectId:number): Observable<any>{
    return this.http.get(`${this.apiUrl}/byprojectId/${projectId}`);
  }
  getTaskByTaskId(taskId:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/taskId/${taskId}`)
  }
  getTaskByUserIdAndStatus(userId:number,status:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/user/${userId}/status/${status}`);
  }
  
}
