import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../Services/rooms.service';
import { HttpClientModule } from '@angular/common/http';
import { BranchesService } from '../../Services/branches.service';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [HttpClientModule,RouterModule],
  providers:[RoomsService,BranchesService,UserService],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit  {
  Rooms: any = [];
  filteredArray:any=[]
  Branches:any=[]
  currentUser:any;
  loading:boolean=true;
  constructor(private roomsServ: RoomsService ,private branchServ:BranchesService,private userServ:UserService,private router:Router) { }
  ngOnInit(): void {
    this.userServ.getCurrentUser().subscribe({
      next:(data)=>{
        this.currentUser = data
        if(!this.currentUser.isAdmin){
          this.loading = false 
        }
        else{
          this.router.navigateByUrl('home')    
        }
      },
      error:()=>{
        alert('Please login first');
        this.router.navigateByUrl('registration')  
      }
    })
    this.GetAll()
    this.GetBranches()
  }

  GetAll() {
    this.roomsServ.GetAllRooms()
    .subscribe(
      {
        next:(data)=> {
          this.Rooms = data;
          this.filteredArray=data 
        },
        error:(err)=>{console.log(err)}
      }
    );
  }

  GetBranches() {
    this.branchServ.getBranches().subscribe({
      next:(data)=>{
       this.Branches=data
         },
       error:(err)=>{
       console.log(err);
       }
       })
  }

  GetFiltered(event:any){
    let branchName=event
    this.roomsServ.GetRoomByBranchId(branchName).subscribe({
    next:(data)=>{ this.filteredArray=data},
    error:(err)=>{console.log(err)}
    })
  }
}
