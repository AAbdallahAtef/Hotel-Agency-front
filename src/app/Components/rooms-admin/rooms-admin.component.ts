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
            console.log(data)
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
  // removeRoom(id: any) {
  //   if (!window.confirm('Are you sure to delete ')) return;
  //   this.roomsServ.deleteRoom(id).subscribe({
  //     next: () => {
  //       const index = this.Rooms.findIndex((item: any) => item.id === id);
  //       this.Rooms.splice(index, 1);
  //     },
  //     error: err => alert("Error deleting the room")
  //   })
    // this.roomsServ.deleteRoom(room).subscribe({
    //   next: () => {
    //     let index = this.Rooms.indexOf(room);
    //     this.Rooms.splice(index, 1);
    //   },
    //   error: err => alert("Error deleting the room")
    // });
  // }


  addRoom(type: any, standardOccupancy: any, maximumOccupancy: any, image: any, basePrice: any, extraPerson: any, description: any,services:any,rating:any,quantity:any,branchId:any) {
    let newRoom = { type, standardOccupancy, maximumOccupancy, image, basePrice, extraPerson, description, services, rating, quantity, branchId };
     newRoom.services = services.split(",");
    console.log(newRoom.services);
    this.roomsServ.addRoom(newRoom).subscribe({
      next:(data)=>{
        this.addedRoom=data
        this.Rooms.push(this.addedRoom.data)
      }
    });
    // this.roomsServ.addRoom({
    //   type: 'Newwwww', standardOccupancy: 1, maximumOccupancy: 3, image: 'https://www.istockphoto.com/photo/hotel-room-suite-with-view-gm627892060-111293677?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Frooms&utm_medium=affiliate&utm_source=unsplash&utm_term=rooms%3A%3A%3A',
    //   basePrice:200,extraPerson:1,services:['Wi Fi'],description:'gffhfghgjnhgmjh',rating:4,quantity:2,branchId:1
    // }).subscribe();
    alert('Added Successfully');
  }

}