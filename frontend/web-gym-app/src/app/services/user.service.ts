import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UserRegisterDto } from '../interfaces/userRegisterDto';
import { UserLoginDto } from '../interfaces/userLoginDto';
import { LoginResponse } from '../interfaces/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl  = 'http://localhost:8080';

  constructor(private http: HttpClient) { }
  static loggedUser: User;

  public getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiServerUrl}/users`);
  }

  public registerUser(user: UserRegisterDto): Observable<UserRegisterDto>{
    return this.http.post<UserRegisterDto>(`${this.apiServerUrl}/register`, user);
  }

  public loginUser(user: UserLoginDto): Observable<LoginResponse>{
    // UserService.loggedUser.email = user.email;
    return this.http.post<LoginResponse>(`${this.apiServerUrl}/login`, user);
  }
  

  public static getLoggedInUserEmail(): string {
    return UserService.loggedUser ? UserService.loggedUser.email : '';
  }
}
