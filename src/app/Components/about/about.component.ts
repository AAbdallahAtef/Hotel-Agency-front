import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../../Services/details.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule,StarRatingComponent],
  providers: [DetailsService],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {
  constructor(private dataBase: DetailsService) {}
  ReviewData: any;
  apiRating: number = 0;
  ngOnInit(): void {
    this.dataBase.getAllReview().subscribe({
      next: (data) => {
        this.ReviewData = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
