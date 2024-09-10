import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserLoginService } from '../../../../service/admin-service/user-login.service';


@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css'
})
export class AuthenticateComponent {
  userLoginForm!: FormGroup;
  showPassword = false;
 
  constructor(
    private fb: FormBuilder,
    private userLoginService: UserLoginService,
    private router: Router
  ) {
    this.userLoginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
 
  login() {
    if (this.userLoginForm.invalid) {
      this.userLoginForm.markAllAsTouched();
      console.error('Form is invalid', this.userLoginForm.errors);
      return;
    }
  
    const { userName, password } = this.userLoginForm.value;
    this.userLoginService.login(userName, password).subscribe({
      next: response => {
        console.log('Login successful', response);
  
        // Ensure userRoleId is correctly set
        setTimeout(() => {
          const userRoleId = parseInt(localStorage.getItem('userRoleId') || '0', 10);
          if (userRoleId === 1) {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/userDashboard']);
          }
        }, 100); // Adjust timeout if necessary or use a more robust method to ensure completion
      },
      error: error => {
        console.error('Login failed', error);
      }
    });
  }
  
    
 
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
 
  isAuthenticated(): boolean {
    return this.userLoginService.isAuthenticated();
  }
 
  toggleShowPassword(field: string): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    }
  }
}
