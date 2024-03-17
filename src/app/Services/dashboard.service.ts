import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private DB_URL = "https://hotel-40q0.onrender.com/"

  constructor(private http: HttpClient) { }

  getDashboardUsers(){

    return this.http.get(this.DB_URL+'auth');

  }

  getDashboardRviews(){

    return this.http.get(this.DB_URL+'review-for-rooms');

  }

  getDashboardRooms(){
    return this.http.get(this.DB_URL+'rooms');

  }

  getDashboardDishes(){

    return this.http.get(this.DB_URL+'dishes');

  }

  getBranchOneRooms(){
    return this.http.get(this.DB_URL+'rooms/branches/1');

  }
  getBranchTwoRooms(){
    return this.http.get(this.DB_URL+'rooms/branches/2');

  }
  getBranchThreeRooms(){
    return this.http.get(this.DB_URL+'rooms/branches/3');

  }
}
