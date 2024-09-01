import { Component, OnInit } from '@angular/core';
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
import { BuyInterface } from '../../interfaces/buyInterface';
import { BuyserviceService } from '../../services/buyservice.service';

@Component({
  selector: 'app-buymembership',
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
  templateUrl: './buymembership.component.html',
  styleUrl: './buymembership.component.css'
})
export class BuymembershipComponent implements OnInit{
  buyForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private buyService: BuyserviceService
  ){}

  ngOnInit(): void {
    this.buyForm = this.fb.group({
      method: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      currency: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get method() {
    return this.buyForm.controls['method'];
  }

  get amount() {
    return this.buyForm.controls['amount'];
  }

  get currency() {
    return this.buyForm.controls['currency'];
  }

  get description() {
    return this.buyForm.controls['description'];
  }

  onSubmit() {
    if (this.buyForm.valid) {
      const buyInterface: BuyInterface = {
        method: this.buyForm.value.method,
        amount: this.buyForm.value.amount,
        currency: this.buyForm.value.currency,
        description: this.buyForm.value.description
      };
  
      this.buyService.buy(buyInterface).subscribe({
        next: (response) => {
          if (response.redirectUrl) {
            window.location.href = response.redirectUrl; // Redirect to PayPal approval URL
          } else {
            console.error('Payment creation failed or no redirect URL received');
          }
        },
        error: (err) => {
          console.error('Error initiating payment', err);
        }
      });
    }
  }
}
