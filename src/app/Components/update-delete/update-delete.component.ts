import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { RoomsService } from '../../Services/rooms.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-update-delete',
  standalone: true,
  imports: [ReactiveFormsModule,
    HttpClientModule,StarRatingComponent
  ],
  providers:[RoomsService,UserService],
  templateUrl: './update-delete.component.html',
  styleUrl: './update-delete.component.css'
})
export class UpdateDeleteComponent implements OnInit {
  ID: any;
  roomObj: any;
  imageSource:any;
  
  constructor(myActivated: ActivatedRoute, private roomsServ: RoomsService, private router: Router,private userService:UserService) {
    this.ID= myActivated.snapshot.params['id'];
  }
  myvalidation: any;
  currentUser:any;
  loading:boolean=true;
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
    this.roomsServ.GetRoomByID(this.ID)
      .subscribe( { 
        next: (data) => { 
          this.roomObj = data;
          this.myvalidation = new FormGroup({
            type:new FormControl(this.roomObj.type,Validators.required),
            standardOccupancy: new FormControl(this.roomObj.standardOccupancy,Validators.required),
            maximumOccupancy: new FormControl(this.roomObj.maximumOccupancy,Validators.required),
            image: new FormControl(this.roomObj.image, Validators.required),
            basePrice: new FormControl(this.roomObj.basePrice, Validators.required),
            extraPerson: new FormControl(this.roomObj.extraPerson,Validators.required),
            services: new FormControl(this.roomObj.services,Validators.required),
            description: new FormControl(this.roomObj.description,Validators.required),
            rating: new FormControl(this.roomObj.rating,Validators.required),
            branchId: new FormControl(this.roomObj.branchId,Validators.required),
            quantity: new FormControl(this.roomObj.quantity,Validators.required)
          })
        },
        error: (err) => { console.log(err) }
    })
  }
  DeleteRoom() {
    if (!window.confirm('Are you sure to delete ')) return;
    this.roomsServ.deleteRoom(this.ID).subscribe();
    alert("Deleted Successfully");
    this.router.navigate(['/roomsadmin']);
  }
  onFileSelected(event:any){
    if(event.target.files.length > 0){
      const file =  URL.createObjectURL(event.target.files[0]);
      this.imageSource = file;
    }
  }
  
  UpdateRoom(type:any, standardOccupancy:any, maximumOccupancy:any,basePrice:any,extraPerson:any,services:any,description:any,quantity:any, branchId:any) {
    let newRoom = {type, standardOccupancy, maximumOccupancy, image:this.imageSource, basePrice, extraPerson, services, description, quantity, branchId};
    
    //convert services from string to array 
    const split_services = newRoom.services.split(",");
    newRoom.services = split_services
    this.roomsServ.updateRoom(this.ID, newRoom).subscribe({
      complete: () => {
        this.router.navigate(['roomsadmin'])
      }
    })
    
   }

}
