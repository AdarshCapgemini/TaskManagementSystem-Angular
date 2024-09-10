import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project } from '../../../../models/admin-models/project';
import { TaskService } from '../../../../service/admin-service/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../../service/admin-service/project.service';
import { AdminNavbarComponent } from "../../admin/admin-navbar/admin-navbar.component";


@Component({
  selector: 'app-add-task-to-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdminNavbarComponent],
  templateUrl: './add-task-to-project.component.html',
  styleUrl: './add-task-to-project.component.css'
})
export class AddTaskToProjectComponent {
  addTaskForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  userId!:number;
  dueDate!:Date
  project!:Project
  projectId!:number;
  priorityDropdownOpen = false;
  statusDropdownOpen = false;

  constructor(private fb: FormBuilder, private taskService: TaskService, private route:ActivatedRoute, private router:Router, private projectService:ProjectService) {}

  ngOnInit(): void {

    this.route.params.subscribe(params=>{
      this.projectId=parseInt(params['projectId'])
    });
    this.getProjectByid(this.projectId);
    
    this.addTaskForm = this.fb.group({
      taskId: ['', Validators.required],
      taskName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      userId: ['', Validators.required],
      projectId: ['', Validators.required]
    });
    this.getTaskIdToRegister();
  }

  getProjectByid(projectId:number):void{
    this.projectService.getProjectByProjectId(projectId).subscribe(
      data=>{this.project=data;
      this.openForm(this.project)}
    )
  }

  openForm(project: Project): void {
    this.addTaskForm.patchValue({
      projectId: project.projectId,
      dueDate : project.endDate,
      userId: project.userId
    });
  }

  onSubmit():void {
    if (this.addTaskForm.valid) {
      const projectId = this.addTaskForm.value.projectId;
      const userId = this.addTaskForm.value.userId;
      const task = this.addTaskForm.value;
      this.taskService.createTask(task).subscribe(
        response => {
          this.successMessage = 'Project updated successfully';
          this.errorMessage = null;

          setTimeout(() => {
            this.router.navigate(['/view-tasks-by-projectId/'+this.projectId]); // Redirect to home or another page
          }, 2000);

        },
        error => {
          this.errorMessage = 'Something went wrong';
          this.successMessage = null;
        }
      );
    } else {
      this.errorMessage = 'Invalid form';
      this.successMessage = null;
    }
  }

  getTaskIdToRegister() {
    this.taskService.getAllTaskIds().subscribe(taskId => {
      let nextId = 1;
      while (taskId.includes(nextId)) {
        nextId++;
      }
      this.addTaskForm.patchValue({ taskId: nextId });
    });
  }

  dropdownOpen = false;

  togglePriorityDropdown() {
    this.priorityDropdownOpen = !this.priorityDropdownOpen;
    if (this.priorityDropdownOpen) {
      this.statusDropdownOpen = false;
    }
  }

  toggleStatusDropdown() {
    this.statusDropdownOpen = !this.statusDropdownOpen;
    if (this.statusDropdownOpen) {
      this.priorityDropdownOpen = false;
    }
  }

  setPriority(priority: string) {
    this.addTaskForm.get('priority')?.setValue(priority);
    this.priorityDropdownOpen = false;
  }

  setStatus(status: string) {
    this.addTaskForm.get('status')?.setValue(status);
    this.statusDropdownOpen = false;
  }

  
}

