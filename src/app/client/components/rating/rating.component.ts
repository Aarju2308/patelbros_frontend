import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {
  @Input() rating = 0;
  maxRating = 5;

  fullStar = Math.floor(this.rating);

  get fullStars():number{
    return this.fullStar;
  }

  get halfStars():boolean{
    return this.rating % 1 != 0
  }
  
  get emptyStars() : number {
    return this.maxRating - Math.ceil(this.rating);
  }
  
}
