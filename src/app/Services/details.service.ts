import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  private DB_Detail_URL = '';
  private DB_Review_URL = 'https://hotel-40q0.onrender.com/reviews-for-hotel';
  constructor(private http: HttpClient) {}
  getAllDetails() {
    return this.http.get(this.DB_Detail_URL);
  }
  getAllReview() {
    return this.http.get(this.DB_Review_URL);
  }
}
