import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../Services/events.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BranchesService } from '../../Services/branches.service';
import { UserService } from '../../Services/user.service';
import { RoomsService } from '../../Services/rooms.service';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule,RouterModule,ReactiveFormsModule],
  providers:[EventsService,BranchesService,UserService,RoomsService],
  templateUrl:'./home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private eventServ:EventsService ,private branchesService:BranchesService,private userService:UserService,private roomsService:RoomsService,private router:Router) {}
  filter = new FormGroup({
    searchinput:new FormControl(""),
  })
  events:any=[]
  roomtype:any=[]
  tempArr:any=[];
  branchData:any;
  currentUser:any={}
  filteredroom:any=[]
  ngOnInit(): void {
    this.roomsService.GetAllRooms().subscribe({
      next:(data)=>{
        this.roomtype=data
      }
      })
    this.eventServ.GetEvents().subscribe({
      next:(data)=>{
        this.events=data
      },
      error:()=>{}
    })
  }
chgInput(){
  if(this.filter.value.searchinput!.length>0){
    this.tempArr = this.roomtype.map((room:any)=>{
      this.branchesService.getBranchById(room.branchId).subscribe({
        next:(data)=>{
          this.branchData = data
          room.branchName = this.branchData.name
        }
      })
      return room
    })
    this.filteredroom=this.tempArr.filter((room:any)=>{
      return room.type.toLowerCase().startsWith(this.filter.value.searchinput!.toLowerCase())
    })
    
  }else{
    this.filteredroom=[]
  }
}
}

