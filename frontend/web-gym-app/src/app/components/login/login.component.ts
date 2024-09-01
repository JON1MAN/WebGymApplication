import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { ImageModule } from 'primeng/image';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserLoginDto } from '../../interfaces/userLoginDto';
import { UserService } from '../../services/user.service';
import { LoginResponse } from '../../interfaces/loginResponse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterModule,
    CommonModule,
    ImageModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ){}



  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() { return this.loginForm.controls['password']; }

  onSubmit(){
    if(this.loginForm.valid){
      const userLoginDto: UserLoginDto = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this.userService.loginUser(userLoginDto).subscribe({
        next: (response: LoginResponse) => {  
          console.log('User logged in successfully', response);
          const token = response.token;  
          this.authService.setAuthToken(token);
          this.router.navigate(['/home']);
        },
        error: (err) => console.error('Error registering user', err)
      });
    }
  }
}
