import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { UpdateProjectComponent } from '../update-project/update-project.component';
import { Router, RouterModule } from '@angular/router';
import { error } from 'console';
import { Project } from '../../../../models/admin-models/project';
import { ProjectService } from '../../../../service/admin-service/project.service';
import { AdminNavbarComponent } from "../../admin/admin-navbar/admin-navbar.component";
import { FormsModule } from '@angular/forms';

declare var bootstrap:any;

@Component({
  selector: 'app-all-projects',
  standalone: true,
  imports: [CommonModule, UpdateProjectComponent, RouterModule, AdminNavbarComponent, FormsModule],
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit,AfterViewInit {
  projects!: Project[];
  projectIdToDelete!: number;
  userId = parseInt(localStorage.getItem('userId') || '0', 10);
  searchTerm: string = '';
  

  @ViewChild(UpdateProjectComponent) updateProjectComponent!: UpdateProjectComponent;

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProject();
  }
  getAllProject() {
    this.projectService.getAllProjects().subscribe(
      data => {
        this.projects = data;
        // this.projects.forEach(project => {
        //   this.getProjectByProjectId(project.projectId);
        // })
      },
      error => { }
    );
  }
  getToTheUpdate(projectId: number): void {
    this.router.navigate([`/update-project/` + projectId]);
  }

  deleteProject(projectId: number): void {
    this.projectService.deleteProject(projectId).subscribe(
      data => { this.projects = data; }
    );

  }

  openUpdateForm(project: Project): void {
    this.updateProjectComponent.openForm(project);
  }

  // getProjectByProjectId(projectId: number): void {
  //   this.projectService.getProjectByProjectId(projectId).subscribe(
  //     data => { this.pr = data; },
  //     error => { }

  //   )
  // }

  ngAfterViewInit(): void {
    // Ensure that Bootstrap is loaded and used only in the browser
    if (typeof bootstrap !== 'undefined') {
      const dropdownElements = document.querySelectorAll('.dropdown-toggle');
      dropdownElements.forEach((element) => {
        try {
          new bootstrap.Dropdown(element);
        } catch (e) {
          console.error('Failed to create dropdown', e);
        }
      });
    }
  }

  getProjectByUserId(userId: number): void {
    this.projectService.getProjectByUserId(userId).subscribe(
      data => {
        this.projects = data;
        this.projects.forEach(project => {
          // Add any additional processing if needed
        });
      },
      error => { console.log(error); }
    );
  }
 
 
  filterProjects(): void {
    console.log('Search Query:', this.searchTerm);
    if (this.searchTerm) {
      this.projects = this.projects.filter((project: { projectName: string; }) =>
        project.projectName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      console.log('Filtered Projects:', this.projects);
    } else {
      this.getAllProject();
    }
  }


}
