import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../../service/admin-service/project.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskService } from '../../../../service/user-service/task.service';
import { Project } from '../../../../models/user-models/project';

@Component({
  selector: 'app-project-for-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './project-for-dashboard.component.html',
  styleUrl: './project-for-dashboard.component.css'
})
export class ProjectForDashboardComponent implements OnInit{
  projects!:Project[]
  project!:Project
  
    constructor(private projectAdminService:ProjectService, 
      private route:ActivatedRoute, 
      private router:Router,
      private taskServiceUser:TaskService
      ){}
    ngOnInit(): void {
      this.getAllProjects();
    }
  
    getAllProjects(){
      this.projectAdminService.getAllProjects().subscribe(
        data => {
          this.projects = data;
          // this.projects.forEach(project => {
          //   const pr = this.projects.find(p => p.projectId === project.projectId);
          //   this.getTasksOfProject(this.project.projectId);
          // });
        },
        error=>{}
      )
    }

    clickGetTasksOfProject(projectId:number){
      this.router.navigate(['/task/' + projectId]);
    }
  
  
    // getTasksOfProject(projectId: number) {
    //   this.taskServiceUser.getTasksOfProject(projectId).subscribe(
    //     data=>{
    //       const project = this.projects.find(p => p.projectId === projectId);
        
    //     if (project) {
    //       this.project.tasks = data;
    //       this.project.taskcount = data.length;
    //     };

  
    //     },
    //     error=>{}
    //   )
      
    // }
    
  }
  