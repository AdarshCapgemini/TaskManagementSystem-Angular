import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TaskService } from '../../../service/admin-service/task.service';
import { Task } from '../../../models/admin-models/task';
import { AdminNavbarComponent } from "../admin/admin-navbar/admin-navbar.component";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, AdminNavbarComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{
  tasks!:Task[]
  userId=parseInt(localStorage.getItem('userId')|| '0',10)
  constructor(private taskService:TaskService){}
  ngOnInit(): void {
    this.getTaskByUserId(this.userId)
  }

  getTaskByUserId(userId:number):void{
    this.taskService.getTaskByUserId(userId).subscribe(
      data => {this.tasks = data;}
    )
  }
}
