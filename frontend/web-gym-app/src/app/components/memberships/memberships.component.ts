import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-memberships',
  standalone: true,
  imports: [],
  templateUrl: './memberships.component.html',
  styleUrl: './memberships.component.css'
})
export class MembershipsComponent {
  
  constructor(private router: Router){ }

  buymembership():void{
    this.router.navigate(['/buymembership']);
  }
}
