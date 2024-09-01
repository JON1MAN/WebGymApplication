
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent implements OnInit{

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const paymentId = params['paymentId'];
      const payerId = params['PayerID'];

      if (paymentId && payerId) {
        this.http.get(`http://localhost:8080/payment/success?paymentId=${paymentId}&payerId=${payerId}`)
          .subscribe(response => {
            console.log('Payment successful', response);
          });
      }
    });
  }
}

