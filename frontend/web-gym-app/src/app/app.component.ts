import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './interfaces/user';
import { UserService } from './services/user.service';
import { response } from 'express';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'web-gym-app';
}
