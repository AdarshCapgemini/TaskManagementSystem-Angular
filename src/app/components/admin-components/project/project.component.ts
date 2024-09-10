import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Project } from '../../../models/admin-models/project';
import { ProjectService } from '../../../service/admin-service/project.service';
import { AdminNavbarComponent } from "../admin/admin-navbar/admin-navbar.component";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, AdminNavbarComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {


  projects: Project[] = [];
  project!: Project;
  newProject: Project = new Project(0, '', '', new Date(), new Date());
  projectIdToUpdate!: number;
  projectDataToUpdate: Project = new Project(0, '', '', new Date(), new Date());
  projectIdToDelete!: number;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjectByUserId(2);
  }

  getProjectByUserId(userId:number):void{
    this.projectService.getProjectByUserId(userId).subscribe(
      data => {this.projects = data;}
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
