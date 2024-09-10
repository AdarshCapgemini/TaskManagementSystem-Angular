import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = 'http://localhost:8083/api/comments';
  constructor(private http: HttpClient) { }

  getCommentsByTaskId(taskId:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/bytaskId/${taskId}`);
  }

  addComment(commentData:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/post`,commentData);
  }

  getAllCommentIds(): Observable<number[]>{
    return this.http.get<number[]>(`${this.baseUrl}/allcommentids`);
  }

}
