import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../../models/user-models/task';
import { TaskService } from '../../../../service/user-service/task.service';


@Component({
  selector: 'app-dash-board-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dash-board-task.component.html',
  styleUrl: './dash-board-task.component.css'
})
export class DashBoardTaskComponent {
  tasks!:Task[]
  count!:number
  taskcount!:number
  userId = parseInt(localStorage.getItem('userId') || '0', 10);

  constructor(private taskService:TaskService, private route: ActivatedRoute){}
  ngOnInit(): void {
    
        this.getTaskByUserId(this.userId);
     
  }

  // getTasksOfProject(projectId:number):void{
  //   this.taskService.getTasksOfProject(projectId).subscribe(
  //     data=>{this.tasks=data;
  //       this.count = data.length;
  //     }
  //   )
  // }
  


  getTaskByUserId(userId:number):void{
    this.taskService.getTaskByUserId(userId).subscribe(
      data => {this.tasks = data;
      this.count=data.length;
      }
    )
  }
}
