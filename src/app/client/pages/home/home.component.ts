import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { EventEmmiterService } from '../../../services/emmiter/event-emmiter.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(
    private eventEmmiter : EventEmmiterService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.eventEmmiter.getCount();  
      }
    });
   
  }
}
