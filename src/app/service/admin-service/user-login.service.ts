import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  private apiUrl = 'http://localhost:8083/api/users';
  toStore!:number
  id!:number
  constructor(private http: HttpClient) {}
 
  login(userName: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, { userName, password }).pipe(
      tap((response: any) => {
        if (response || response.code === "AUTHSUCCESS") {
          this.getUserRoleIds(userName).subscribe(roleIds => {
            const containsRoleIdOne = roleIds.includes(1);
            localStorage.setItem('isAuthenticated', 'true');
            // Store 1 if the list contains role ID 1, otherwise store 2
            localStorage.setItem('userRoleId', containsRoleIdOne ? '1' : '2');
          });
        }
      })
    );
  }
 
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRoleId'); // Remove UserRoleID
  }
 
  isAuthenticated(): boolean {
    return !!localStorage.getItem('isAuthenticated');
  }
 
  getUserRoleId(): number | null {
    const userRoleId = localStorage.getItem('userRoleId');
    return userRoleId ? parseInt(userRoleId, 10) : null;
  }
 
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  getUserRoleIds(userName:string): Observable<any> {
    return this.http.get<number[]>(`${this.apiUrl}/login/${userName}`);
  }


}
