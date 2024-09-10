import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { TaskComponent } from '../task/task.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Project } from '../../../models/user-models/project';
import { Task } from '../../../models/user-models/task';
import { ProjectService } from '../../../service/user-service/project.service';
import { TaskService } from '../../../service/user-service/task.service';
import { HeaderComponent } from '../layout/header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, TaskComponent, RouterModule, HeaderComponent,FormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {


  projects!: Project[];
  project!:Project;
  count!: number
  taskcount!: any
  newProject: Project = new Project(0, '', '', new Date(), new Date());
  projectIdToUpdate!: number;
  projectDataToUpdate: Project = new Project(0, '', '', new Date(), new Date());
  projectIdToDelete!: number;
  taskComponent!: TaskComponent
  task!: Task[]
  userId = parseInt(localStorage.getItem('userId') || '0', 10);
  searchQuery!:string

  constructor(private projectService: ProjectService, private router: Router, private taskService:TaskService,private route:ActivatedRoute) { }

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
      }

    )
  }

  filterProjects(): void {
    console.log('Search Query:', this.searchQuery);
    if (this.searchQuery) {
      this.projectService.getProjectByUserId(this.userId).subscribe(
        data => {
          this.projects = data.filter((project: { projectId: number; }) =>
            project.projectId
          );
          console.log('Filtered Projects:', this.projects);
        }
      );
    } else {
      this.getProjectByUserId(this.userId);
    }
  }
  

}
