import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey: string = 'token';
  
  constructor(private router: Router){ }

  getAuthToken(): string | null{
    const token =  window.localStorage.getItem(this.tokenKey);
    console.log("Retrieved token:", token);
    return token;
  }

  setAuthToken(token: string | null): void{
    if(token !== null){
      window.localStorage.setItem(this.tokenKey, token);
    } else{
      window.localStorage.removeItem(this.tokenKey)
    }
  }

  logout(): void {
    // Clear token from local storage
    this.setAuthToken(null);

    // Optionally call backend API to invalidate session
    // this.http.post('http://localhost:8080/logout', {}).subscribe();

    // Redirect user to login page or home page
    this.router.navigate(['/login']);
  }
}