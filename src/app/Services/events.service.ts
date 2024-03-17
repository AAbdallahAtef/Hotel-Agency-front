import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
private DB_URL='https://hotel-40q0.onrender.com/events'
  constructor(private http:HttpClient) { }
  GetEvents(){
     return this.http.get(this.DB_URL)
  }
 
} 
