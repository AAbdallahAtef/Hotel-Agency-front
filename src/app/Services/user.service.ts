import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private DB_URL = "https://hotel-40q0.onrender.com/auth"
  constructor(private http:HttpClient) { }
  regestration(newUser:any){
    return this.http.post(`${this.DB_URL}/reg`,newUser);
  }
  login(loginUser:any){
    return this.http.post(`${this.DB_URL}/login`,loginUser,{withCredentials:true});
  } 
  getAll(){
    return  this.http.get(`${this.DB_URL}`);
  }
  getCurrentUser(){
    return this.http.get(`${this.DB_URL}/currentUser`,{withCredentials:true});
  }
  logOut(){
    return this.http.post(`${this.DB_URL}/logout`,{},{withCredentials: true});
  }
}
