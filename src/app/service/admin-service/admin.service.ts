import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8083/api/users';

  constructor(private http: HttpClient) {}

  // Create a new user
  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/post`, userData);
  }

  // Get a list of all users
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  // Get details of a specific user by ID
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  // Get users with a specific email domain
  getUsersByEmailDomain(domain: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/email-domain/${domain}`);
  }

  // Search for users by name
  searchUsersByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search/${name}`);
  }

  // Get users who are assigned the most tasks
  getUsersWithMostTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/most-tasks`);
  }

  // Authenticate a user
  authenticateUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, credentials);
  }

  // Get users who have completed tasks
  getUsersWithCompletedTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/completed-tasks`);
  }

  // Update user details
  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${userId}`, userData);
  }

  // Delete a user
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${userId}`);
  }
}
