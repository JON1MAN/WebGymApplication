import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit{
  constructor(private authService: AuthService){
  }
  ngOnInit(): void {
    this.logout;
  }

  logout(): void {
    this.authService.logout();
  }
}
