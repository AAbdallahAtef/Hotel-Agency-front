import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private DB_URL='https://hotel-40q0.onrender.com/rooms'
  constructor(private http:HttpClient) { }
  GetAllRooms(){
    return this.http.get(this.DB_URL)
  }
  GetRoomByID(id:any){
    return this.http.get(`${this.DB_URL}/${id}`)
  }
  GetReviewsByID(id:any){
    return this.http.get(`https://hotel-40q0.onrender.com/review-for-rooms/${id}`)
  }
  GetRoomByBranchId(id:any){
    return this.http.get(`https://hotel-40q0.onrender.com/rooms/branches/${id}`)
  }
  addRoom(room:any) {
    return this.http.post(this.DB_URL, room,{withCredentials:true});
  }
  deleteRoom(id: number) { 
    return  this.http.delete(`${this.DB_URL}/${id}`,{withCredentials:true});
  }
  updateRoom(id: number, room: any) { 
    return this.http.patch(`${this.DB_URL}/${id}`, room,{withCredentials:true});
  }
  AddReviews(review:any){
   return this.http.post(`https://hotel-40q0.onrender.com/review-for-rooms`,review)
  }
}
