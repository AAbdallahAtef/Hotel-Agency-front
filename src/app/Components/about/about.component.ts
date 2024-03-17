import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../../Services/details.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule],
  providers: [DetailsService],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {
  stars: string[] = [
    'fas fa-star',
    'far fa-star',
    'far fa-star',
    'far fa-star',
    'far fa-star',
  ];
  constructor(private dataBase: DetailsService) {}
  ReviewData: any;
  apiRating: number = 0;
  ngOnInit(): void {
    this.dataBase.getAllReview().subscribe({
      next: (data) => {
        this.ReviewData = data;
        console.log(this.ReviewData);
        console.log(this.ReviewData.rating);
        console.log(this.ReviewData.text);

        this.apiRating = this.ReviewData.rating;
        console.log(this.apiRating);
        this.setStarRating(this.apiRating);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  setStarRating(rating: any): void {
    for (let i = 0; i < this.stars.length; i++) {
      if (i < rating) {
        this.stars[i] = 'fas fa-star';
      } else {
        this.stars[i] = 'far fa-star';
      }
    }
  }
}
