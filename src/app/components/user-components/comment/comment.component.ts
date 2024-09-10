import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Task } from '../../../models/user-models/task';
import { CommentService } from '../../../service/user-service/comment.service';
import { TaskService } from '../../../service/user-service/task.service';
import { Comment } from '../../../models/user-models/comment';
import { HeaderComponent } from "../layout/header/header.component";


@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {
  comments!:Comment[]
  task!:Task
  userId = parseInt(localStorage.getItem('userId') || '0', 10);
  taskId!:number

  constructor(private commentService:CommentService,private taskService:TaskService,private route:ActivatedRoute,private router:Router){}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.taskId = params['taskId'],
      this.getCommentByTaskId(params['taskId'])
    });
  }

  
  getCommentByTaskId(taskId:number):void{
    this.taskService.getTaskByTaskId(taskId).subscribe(
      data=>{this.task=data},
      error=>{}
    )
    this.commentService.getCommentsByTaskId(taskId).subscribe(
      data=>{this.comments=data},
      error=>{}
    )
  }

}
