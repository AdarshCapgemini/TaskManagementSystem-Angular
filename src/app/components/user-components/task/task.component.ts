import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Task } from '../../../models/user-models/task';
import { Attachment } from '../../../models/user-models/attachment';
import { TaskService } from '../../../service/user-service/task.service';
import { AttachmentService } from '../../../service/user-service/attachment.service';
import { CommentService } from '../../../service/user-service/comment.service';
import { HeaderComponent } from "../layout/header/header.component";
import { error } from 'console';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  tasks!: Task[]
  userId = parseInt(localStorage.getItem('userId') || '0', 10);
  projectId!: number
  task!: Task
  count!: number
  taskcount!: number
  attachments!: Attachment[]
  searchQuery: string = '';
  private originalTasks: any[] = []; // Store the original tasks order
  private isSortedByPriority: boolean = false;
  private isSortedByStatus: boolean = false; // Flag to track sorting state

  // comment!:Comment

  constructor(private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private commentService: CommentService,
    private attachmentService: AttachmentService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['projectId']) {
        this.getTasksOfProject(params['projectId']);
      }
      else {
        this.getTaskByUserId(this.userId);
      }
    });
  }



  getTasksOfProject(projectId: number): void {
    this.taskService.getTasksOfProject(projectId).subscribe(

      data => {
        this.tasks = data;
        this.count = data.length;
        this.tasks.forEach(task => {
          this.getCommentsOfTasks(task.taskId);
          this.getAttachmentOfTasks(task.taskId);

        });

      },
      error => { console.log(error) }
    )
  }

  getAttachmentOfTasks(taskId: number): void {
    this.attachmentService.getAttachmentByTaskId(taskId).subscribe(
      data => {
        const task = this.tasks.find(t => t.taskId === taskId);

        if (task) {
          task.attachments = data;
          task.countOfAttachment = data.length;
        }

      },
      error => { console.log(error) }
    )
  }

  getCommentsOfTasks(taskId: number): void {
    this.commentService.getCommentsByTaskId(taskId).subscribe(

      data => {

        const task = this.tasks.find(t => t.taskId === taskId);

        if (task) {
          task.comments = data;
          task.countOfComment = data.length;
        }

      },
      error => { console.log(error) }
    )
  }



  getTaskByUserId(userId: number): void {
    this.taskService.getTaskByUserId(userId).subscribe(
      data => {
        this.tasks = data;
        this.count = data.length;
        this.tasks.forEach(task => {
          this.getCommentsOfTasks(task.taskId);
          this.getAttachmentOfTasks(task.taskId);

        });
      },
      error => { console.log(error) }
    )
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
      this.taskService.getTaskByUserId(this.userId).subscribe(
        data => {
          this.tasks = data.filter((task: { taskName: string; }) =>
            task.taskName.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
          console.log('Filtered Tasks:', this.tasks);
        }
      );
    } else {
      this.getTaskByUserId(this.userId);
    }
  }

}
