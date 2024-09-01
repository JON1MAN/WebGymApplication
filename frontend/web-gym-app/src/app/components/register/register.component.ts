import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { ImageModule } from 'primeng/image';
import { passwordMatchValidator } from '../../shared/password-match.directive';
import { UserService } from '../../services/user.service';
import { UserRegisterDto } from '../../interfaces/userRegisterDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
     private userService: UserService,
     private router: Router
    ){}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },{
      validators: passwordMatchValidator
    });
  }

  onSubmit(): void{
      if(this.registerForm.valid){
        const userRegister: UserRegisterDto = {
          firstname: this.registerForm.value.firstname,
          lastname: this.registerForm.value.lastname,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
        };
        this.userService.registerUser(userRegister).subscribe({
          next: (response) => {
            console.log('User registered successfully', response);
            this.router.navigate(['/login']);

          },
          error: (err) => console.error('Error registering user', err)
        });
    }
  }

  get firstname() {
    return this.registerForm.controls['firstname'];
  }

  get lastname() {
    return this.registerForm.controls['lastname'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  
  
}
