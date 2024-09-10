import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../../models/admin-models/user';
import { UserComponent } from '../../components/admin-components/user/user.component';
 
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  toStore!:number
  private apiUrl = 'http://localhost:8083/api/users';
  constructor(private http: HttpClient) { }
 
  login(userName: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, { userName, password }).pipe(
      tap((response: any) => {
        if (response || response.code === "AUTHSUCCESS") {
          this.getUserRoleIds(userName).subscribe(roleIds => {
            const containsRoleIdOne = roleIds.includes(1);
            const userId=this.getUserIdWithUserName(userName);
            localStorage.setItem('isAuthenticated', 'true');
            // Store 1 if the list contains role ID 1, otherwise store 2
            localStorage.setItem('userRoleId', containsRoleIdOne ? '1' : '2');
            this.getUserIdWithUserName(userName).subscribe(userId => {
              localStorage.setItem('userId', userId.toString());
            });
          });
        }
      })
    );
  }
 
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRoleId'); // Remove UserRoleID
    localStorage.removeItem('userId');
  }
 
  isAuthenticated(): boolean {
    return !!localStorage.getItem('isAuthenticated');
  }
 
  getUserRoleId(): number | null {
    const userRoleId = localStorage.getItem('userRoleId');
    return userRoleId ? parseInt(userRoleId, 10) : null;
  }
 
  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }
 
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }
 
  getUserRoleIds(userName:string): Observable<any> {
    return this.http.get<number[]>(`${this.apiUrl}/login/${userName}`);
  }
 
  getUserIdWithUserName(userName:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/userName/${userName}`);
  }

  getAllUserIds(): Observable<any> {
    return this.http.get<number[]>(`${this.apiUrl}/allIds`);
  }

  addUser(user:  User){
    
  }
}