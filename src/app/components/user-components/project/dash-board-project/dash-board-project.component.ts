import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Project } from '../../../../models/user-models/project';
import { ProjectService } from '../../../../service/user-service/project.service';
import { TaskService } from '../../../../service/user-service/task.service';
import { TaskComponent } from '../../task/task.component';
import { Task } from '../../../../models/user-models/task';


@Component({
  selector: 'app-dash-board-project',
  standalone: true,
  imports: [CommonModule, TaskComponent],
  templateUrl: './dash-board-project.component.html',
  styleUrl: './dash-board-project.component.css'
})
export class DashBoardProjectComponent implements OnInit {


  projects!: Project[];
  project!:Project;
  count!: number
  taskcount!: any
  newProject: Project = new Project(0, '', '', new Date(), new Date());
  projectIdToUpdate!: number;
  projectDataToUpdate: Project = new Project(0, '', '', new Date(), new Date());
  projectIdToDelete!: number;
  taskComponent!: TaskComponent
  userId = parseInt(localStorage.getItem('userId') || '0', 10);
  task!: Task[]

  constructor(private projectService: ProjectService, private router: Router, private taskService:TaskService) { }

  ngOnInit(): void {
    this.getProjectByUserId(this.userId);

  }

  clickGetTasksOfProject(projectId:number){
    this.router.navigate(['/task/' + projectId]);
  }


  getTasksOfProject(projectId: number) {
    this.taskService.getTasksOfProject(projectId).subscribe(
      data=>{
        const project = this.projects.find(p => p.projectId === projectId);
      
      if (project) {
        project.tasks = data;
        project.taskcount = data.length;
      }

      },
      error=>{}
    )
    
  }

  getProjectByUserId(userId: number): void {
    this.projectService.getProjectByUserId(userId).subscribe(
      data => {
        this.projects = data;
        this.count = data.length;
        this.projects.forEach(project => {
          this.getTasksOfProject(project.projectId);
          
  
        });
      },
      error=>{}

    )
  }

  

  getOngoingProjects(): void {
    this.projectService.getOngoingProjects().subscribe(data => {
      this.projects = data;
    });
  }

  getProjectById(projectId: number): void {
    this.projectService.getProjectsByUserRole(projectId.toString()).subscribe(data => {
      this.project = data;
    });
  }

  createProject(): void {
    this.projectService.createProject(this.newProject).subscribe(data => {
      console.log('Project created:', data);
      this.getOngoingProjects(); // Refresh the list
    });
  }

  updateProject(): void {
    this.projectService.updateProject(this.projectIdToUpdate, this.projectDataToUpdate).subscribe(data => {
      console.log('Project updated:', data);
      this.getOngoingProjects(); // Refresh the list
    });
  }

  deleteProject(): void {
    this.projectService.deleteProject(this.projectIdToDelete).subscribe(data => {
      console.log('Project deleted:', data);
      this.getOngoingProjects(); // Refresh the list
    });
  }

}

