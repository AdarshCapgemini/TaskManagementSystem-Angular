import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/admin-models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8083/api/tasks';
  constructor(private http: HttpClient) {}

  getTaskByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`);
  }

  createTask(taskData : any): Observable<any> {
    return this.http.post(`${this.apiUrl}/post`, taskData);
  }
  
  getTaskByProjectId(projectId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/byprojectId/${projectId}`);
  }

  getAllTask():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/all`);
  }

  getOverdueTasks():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/overdue`);
  }
  getTaskByStatus(status: string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/status/${status}`);
  }
  getTasksDueSoon():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/due-soon`);
  }

  getTasksByPriority(priority:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/priority/${priority}`);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/update/${task.taskId}`, task);
  }

  getAllTaskIds(): Observable<any> {
    return this.http.get<number[]>(`${this.apiUrl}/getAllTaskIds`);
  }

}
