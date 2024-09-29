import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private tokenService : TokenService,
    private router : Router
  ){}

  logout(){
    if (confirm("Are you sure you want to logout?")) {
      this.tokenService.removeToken();
      this.router.navigateByUrl('admin/login');
    }
  }
  isCategoryOpen = false;
}
