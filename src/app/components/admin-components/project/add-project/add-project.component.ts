import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../../service/admin-service/project.service';
import { AdminNavbarComponent } from "../../admin/admin-navbar/admin-navbar.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdminNavbarComponent],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {
  projectForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
 
  constructor(private fb: FormBuilder,private projectService:ProjectService, private router:Router) {}
 
  ngOnInit(): void {
    this.projectForm = this.fb.group({
      projectId: [null, Validators.required],
      projectName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      userId:[null,Validators.required]
    });
  }
  onSubmit() {
    if (this.projectForm.valid) {
      const project = this.projectForm.value;
      this.projectService.createProject(project).subscribe(
        response => {
          this.successMessage = 'Project created successfully';
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

  getProjectIdToRegister() {
    this.projectService.getAllProjectIds().subscribe(projectId => {
      let nextId = 1;
      while (projectId.includes(nextId)) {
        nextId++;
      }
      this.projectForm.patchValue({ projectId: nextId });
    });
  }
}
