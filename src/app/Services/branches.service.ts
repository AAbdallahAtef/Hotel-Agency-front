import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  constructor(private http: HttpClient) { }
  private DB_URL = "https://hotel-40q0.onrender.com/branches";
  getBranches() { 
    return this.http.get(this.DB_URL);
  }
  getBranchById(id:any){
    return this.http.get(`${this.DB_URL}/${id}`)
  }
  GetRoomsByBranchID(id:any){
   return this.http.get(`https://hotel-40q0.onrender.com/rooms/branches/${id}`)
  }
  GetRoomsByID(id:any){
    return this.http.get(`https://hotel-40q0.onrender.com/rooms/${id}`)
  }
  ReserveRoom(value:any){
    return this.http.post('https://hotel-40q0.onrender.com/reservation',value)
  }
  GetReserveByUserID(id:any){
    return this.http.get(`https://hotel-40q0.onrender.com/reservation/user/${id}`)
  }
  updateReserv(id:any,updatedReserv:any){
    return this.http.patch(`https://hotel-40q0.onrender.com/reservation/${id}`,updatedReserv) 
  }
GetReservationByID(id:any)
{
  return this.http.get(`https://hotel-40q0.onrender.com/reservation/${id}`)
}
  DeleteReserve(id:any){
   return this.http.delete(`https://hotel-40q0.onrender.com/reservation/${id}`) 
  }
  UpdateReserve(id:any , value:any){
    return this.http.patch(`https://hotel-40q0.onrender.com/reservation/${id}`,value)
  }

}
