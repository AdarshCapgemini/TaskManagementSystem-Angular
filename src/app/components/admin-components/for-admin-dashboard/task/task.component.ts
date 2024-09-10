import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TaskService } from '../../../../service/admin-service/task.service';
import { Task } from '../../../../models/admin-models/task';
import { error } from 'console';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-for-dash-board',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  tasks!:Task[]

  constructor(private taskService:TaskService){}
  ngOnInit(): void {
    this.taskService.getAllTask().subscribe(
      data=>{this.tasks=data;},
      error=>{}
    )
  }
}
