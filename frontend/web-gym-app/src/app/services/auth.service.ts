import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey: string = 'token';

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
}