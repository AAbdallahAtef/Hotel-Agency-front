import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { RoomsService } from '../../Services/rooms.service';
import { UserService } from '../../Services/user.service';


@Component({
  selector: 'app-rooms-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    StarRatingComponent,
    HttpClientModule],
  providers: [RoomsService,UserService],
  templateUrl: './rooms-admin.component.html',
  styleUrl: './rooms-admin.component.css'
})
export class RoomsAdminComponent implements OnInit {
  Rooms: any = [];
  ID: any;
  addedRoom:any={};
  imageSource:any;
  roomObj: any = {
    basePrice: "",
    description: "",
    extraPerson: "",
    image: "",
    maximumOccupancy:"",
    rating: "",
    services: [],
    standardOccupancy: "",
    type: "",
    quantity: "",
    branchId:"",
    _id: 0
   
  };
  loading:boolean=true;
  currentUser:any;
  isSidePanelVisible: boolean = false;
  constructor(private roomsServ: RoomsService, private router: Router,private userService:UserService) { }
  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next:(data)=>{
        this.currentUser =data
        if(this.currentUser.isAdmin){
          this.loading = false 
        }
        else{
          alert('You are not authorized to view this page');
          this.router.navigateByUrl('home')    
        }
      },
      error:()=>{
        alert('Please login first');
        this.router.navigateByUrl('registration')  
      }
    })
    this.roomsServ.GetAllRooms()
      .subscribe(
        {
          next: (data) => {
            this.Rooms = data;
          },
          error: (err) => { console.log(err) }
        }
      );
  }
  openSidePanel() {
    this.isSidePanelVisible = true;
  }
  closeSidePanel() {
    this.isSidePanelVisible = false;
  }
  onFileSelected(event:any){
    if(event.target.files.length > 0){
      const file =  URL.createObjectURL(event.target.files[0]);
      this.imageSource = file;
    }
  }


  addRoom(type: any, standardOccupancy: any, maximumOccupancy: any, basePrice: any, extraPerson: any,description: any,services:any,quantity:any,branchId:any) {
    let newRoom = { type, standardOccupancy, maximumOccupancy, image:this.imageSource, basePrice, extraPerson,rating:5, description, services, quantity, branchId };
     newRoom.services = services.split(",");
    this.roomsServ.addRoom(newRoom).subscribe({
      next:(data)=>{
        this.addedRoom=data
        this.Rooms.push(this.addedRoom.data)
      }
    });

    alert('Added Successfully');
  }

}