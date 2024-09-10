import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { UserroleService } from '../../../../service/admin-service/userrole.service';
import { AdminNavbarComponent } from "../../admin/admin-navbar/admin-navbar.component";

@Component({
  selector: 'app-add-userrole',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdminNavbarComponent],
  templateUrl: './add-userrole.component.html',
  styleUrls: ['./add-userrole.component.css']
})
export class AddUserroleComponent implements OnInit {
  userRoleForm: FormGroup;
  userRoles: any[] = [];
  userId!: number;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private userroleService: UserroleService, 
    private route: ActivatedRoute,
    private router: Router // Inject Router
  ) {
    this.userRoleForm = this.fb.group({
      userRole: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userroleService.getAllUserRoles().subscribe(data => {
      this.userRoles = data;
    });

    this.route.params.subscribe(params => {
      this.userId = +params['userId']; // Assuming the URL contains a parameter named 'userId'
    });
  }

  onSubmit(): void {
    if (this.userRoleForm.valid) {
      const data = {
        userId: this.userId, 
        userRoleId: this.userRoleForm.value.userRole
      };
      this.userroleService.assignUserRoleToUser(data).subscribe(
        response => {
          this.successMessage = 'User role assigned successfully';
          this.errorMessage = ''; 
          setTimeout(() => {
            this.router.navigate(['/all-users']); 
          }, 2000); 
        },
        error => {
          this.successMessage = ''; 
          this.errorMessage = 'Something went wrong. Please try again.';
        }
      );
    }
  }
}
