import { Injectable } from '@angular/core';
import { BuyInterface } from '../interfaces/buyInterface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuyserviceService {

  private apiServerUrl  = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  buy(payment: BuyInterface):Observable<{redirectUrl: string}>{
    return this.http.post<{redirectUrl: string}>(`${this.apiServerUrl}/paymentcreate`, payment);
  }

}
