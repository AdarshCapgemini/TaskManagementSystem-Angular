import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../../models/admin-models/project';
import { ProjectService } from '../../../../service/admin-service/project.service';
import { AdminNavbarComponent } from "../../admin/admin-navbar/admin-navbar.component";

@Component({
  selector: 'app-update-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdminNavbarComponent],
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  projectForm!: FormGroup;
  project!:Project
  successMessage: string | null = null;
  errorMessage: string | null = null;
  userId!:number;

  constructor(private fb: FormBuilder, private projectService: ProjectService, private route:ActivatedRoute, private router:Router) {}

  ngOnInit(): void {

    this.route.params.subscribe(params=>{
      this.userId=parseInt(params['id'])
      this.getProjectByid(params['id'])
    });
    
    this.projectForm = this.fb.group({
      projectId: ['', Validators.required],
      projectName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      userId: ['', Validators.required]
    });

    
  }
  getProjectByid(projectId:number):void{
    this.projectService.getProjectByProjectId(projectId).subscribe(
      data=>{this.project=data;
      this.openForm(this.project)}
    )
  }

  openForm(project: Project): void {
    this.projectForm.patchValue({
      projectId: project.projectId,
      projectName: project.projectName,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      userId: project.userId
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const projectId = this.projectForm.value.projectId;
      const project = this.projectForm.value;
      this.projectService.updateProject(projectId, project).subscribe(
        response => {
          this.successMessage = 'Project updated successfully';
          this.errorMessage = null;
          setTimeout(() => {
            this.router.navigate(['/all-projects']); // Redirect to home or another page
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
}
