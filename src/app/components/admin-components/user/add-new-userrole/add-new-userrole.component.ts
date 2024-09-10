import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
 // Adjust the path as needed
import { ActivatedRoute, Router } from '@angular/router';
import { UserroleService } from '../../../../service/admin-service/userrole.service';
import { AdminNavbarComponent } from "../../admin/admin-navbar/admin-navbar.component";

@Component({
  selector: 'app-add-new-userrole',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdminNavbarComponent],
  templateUrl: './add-new-userrole.component.html',
  styleUrls: ['./add-new-userrole.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class AddNewUserroleComponent implements OnInit {
  userRoleForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userroleService: UserroleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userRoleForm = this.fb.group({
      userRoleId: ['', Validators.required],
      roleName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getRoleIdToRegister();
  }

  onSubmit(): void {
    if (this.userRoleForm.valid) {
      const data = {
        userRoleId: this.userRoleForm.value.userRoleId,
        roleName: this.userRoleForm.value.roleName
      };

      this.userroleService.createNewUserRole(data).subscribe(
        response => {
          this.successMessage = 'User Role added successfully';
          this.errorMessage = ''; // Clear any previous error message

          setTimeout(() => {
            this.router.navigate(['/all-users']); // Redirect to home or another page
          }, 2000);
        },
        error => {
          this.successMessage = ''; // Clear any previous success message
          this.errorMessage = 'Something went wrong. Please try again.';
        }
      );
    }
  }

  getRoleIdToRegister() {
    this.userroleService.getAllRoleIds().subscribe(userRoleId => {
      let nextId = 1;
      while (userRoleId.includes(nextId)) {
        nextId++;
      }
      this.userRoleForm.patchValue({ userRoleId: nextId });
    });
  }
}
