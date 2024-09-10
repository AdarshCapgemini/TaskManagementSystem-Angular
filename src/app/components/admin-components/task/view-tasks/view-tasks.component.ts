import { Component } from '@angular/core';
import { Task } from '../../../../models/admin-models/task';
import { TaskService } from '../../../../service/admin-service/task.service';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from "../../admin/admin-navbar/admin-navbar.component";

@Component({
  selector: 'app-view-tasks',
  standalone: true,
  imports: [CommonModule, AdminNavbarComponent],
  templateUrl: './view-tasks.component.html',
  styleUrl: './view-tasks.component.css'
})
export class ViewTasksComponent {
  tasks!:Task[]
  userId=parseInt(localStorage.getItem('userId')|| '0',10)
  constructor(private taskService:TaskService){}
  ngOnInit(): void {
    this.getTasks()
  }

  getTasks():void{
    this.taskService.getAllTask().subscribe(
      data => {this.tasks = data;}
    )
  }

}
