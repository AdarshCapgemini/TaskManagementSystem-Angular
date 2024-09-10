import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../service/login-service/login.service';
import { AdminService } from '../../../service/admin-service/admin.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  userRegisterForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  message: string = ''; // Added for status messages
 
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private adminService: AdminService,
    private router: Router
  ) {
    this.userRegisterForm = this.fb.group({
      userId: [{ value: '', disabled: true }, [Validators.required]], // Make userId readonly
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$*#])[A-Za-z\\d@$*#]{6,12}$')]],
      confirmPassword: ['', [Validators.required]],
      fullName: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }
 
  ngOnInit(): void {
    this.getUserIdToRegister(); // Fetch and set the userId when the component initializes
  }
 
  onSubmit() {
    if (this.userRegisterForm.valid) {
      this.adminService.createUser(this.userRegisterForm.value).subscribe({
        next: (data) => {
          this.message = 'Registration successful!'; // Success message
          setTimeout(() => {
            this.router.navigate(['']);
          }, 2000);
        },
        error: (error) => {
          this.message = 'Something went wrong. Please try again.'; // Error message
        }
      });
    }
  }
 
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
 
  toggleShowPassword(field: string): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
 
  getUserIdToRegister() {
    this.loginService.getAllUserIds().subscribe(userIds => {
      let nextId = 1;
      while (userIds.includes(nextId)) {
        nextId++;
      }
      this.userRegisterForm.patchValue({ userId: nextId });
    });
  }
}
