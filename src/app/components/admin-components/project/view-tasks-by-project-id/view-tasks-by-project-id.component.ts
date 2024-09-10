import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../../../models/admin-models/task';
import { ProjectService } from '../../../../service/admin-service/project.service';
import { ActivatedRoute,Router } from '@angular/router';
import { TaskService } from '../../../../service/admin-service/task.service';
import { AdminNavbarComponent } from "../../admin/admin-navbar/admin-navbar.component";


@Component({
  selector: 'app-view-tasks-by-project-id',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdminNavbarComponent, FormsModule],
  templateUrl: './view-tasks-by-project-id.component.html',
  styleUrl: './view-tasks-by-project-id.component.css'
})
export class ViewTasksByProjectIdComponent implements OnInit{
  tasks!:Task[];
  projectId!:number
  statuses=['Pending','In Progress','Completed'];
  priorities=['Low','Medium','High'];
  searchQuery: string = '';
  private originalTasks: any[] = []; // Store the original tasks order
  private isSortedByPriority: boolean = false;
  private isSortedByStatus: boolean = false; // Flag to track sorting state
  count!: number;
  userId = parseInt(localStorage.getItem('userId') || '0', 10);
  
  constructor(private projectService: ProjectService, 
    private router: Router,
     private taskService: TaskService, 
     private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId=params['projectId']
      this.getAllTasksForProjectId(params['projectId']);
    })
  }

  getAllTasksForProjectId(projectId:number)
  {
    this.taskService.getTaskByProjectId(projectId).subscribe(
      data => {
        this.tasks = data;
      },
    )
  }
  getTaskByUserId(userId: number): void {
    this.taskService.getTaskByUserId(userId).subscribe(
      data => { this.tasks = data; }
    );
  }
 
  updateTask(task: Task): void {
    task.projectId=this.projectId;
    task.userId=parseInt(localStorage.getItem('userId') || '0',10)
    this.taskService.updateTask(task).subscribe(
      response => {
        console.log('Task updated successfully', response);
      },
      error => {
        console.error('Error updating task', error);
      }
    );
  }

  priorityOrder: { [key: string]: number } = {
    'High': 1,
    'Medium': 2,
    'Low': 3
  };
 
  sortTasksByPriority() {
    if (!this.isSortedByPriority) {
      // Save the original order before sorting
      this.originalTasks = [...this.tasks];
      console.log('Before sorting:', this.tasks);
      this.tasks.sort((a, b) => this.priorityOrder[a.priority] - this.priorityOrder[b.priority]);
      console.log('After sorting:', this.tasks);
      this.isSortedByPriority = true;
    } else {
      // Restore the original order
      this.tasks = [...this.originalTasks];
      console.log('Restored original order:', this.tasks);
      this.isSortedByPriority = false;
    }
  }
 
  statusOrder: { [key: string]: number } = {
    'Pending': 1,
    'In Progress': 2,
    'Completed': 3
  };
 
  sortTasksByStatus() {
    if (!this.isSortedByStatus) {
      // Save the original order before sorting
      this.originalTasks = [...this.tasks];
      console.log('Before sorting:', this.tasks);
      this.tasks.sort((a, b) => this.statusOrder[a.status] - this.statusOrder[b.status]);
      console.log('After sorting:', this.tasks);
      this.isSortedByStatus = true;
    } else {
      // Restore the original order
      this.tasks = [...this.originalTasks];
      console.log('Restored original order:', this.tasks);
      this.isSortedByStatus = false;
    }
  }

  filterTasks(): void {
    console.log('Search Query:', this.searchQuery);
    if (this.searchQuery) {
      this.taskService.getTaskByProjectId(this.projectId).subscribe(
        data => {
          this.tasks = data.filter((task: { taskName: string; }) =>
            task.taskName.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
          console.log('Filtered Tasks:', this.tasks);
        }
      );
    } else {
      this.getAllTasksForProjectId(this.projectId);
    }
 
}

  
}
