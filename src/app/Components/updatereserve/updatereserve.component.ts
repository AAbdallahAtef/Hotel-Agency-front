import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchesService } from '../../Services/branches.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updatereserve',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule,CommonModule,FormsModule],
  providers:[BranchesService,UserService],
  templateUrl: './updatereserve.component.html',
  styleUrl: './updatereserve.component.css'
})
export class UpdatereserveComponent implements OnInit {
  ID:any;
  reserveData:any;
  myvalid:any;
  branches:any=[];
  branchName:any
  SelectedRoom:any;
  Rooms:any=[];
  cRoom: any;
  currentUser:any
  test:any;
  loading:boolean=true;
  constructor(private branchServ:BranchesService,private myActivated:ActivatedRoute,private userServ:UserService,private router:Router){
    this.ID=myActivated.snapshot.params['id']
  }
  ngOnInit(): void {
    this.userServ.getCurrentUser().subscribe({
      next:(data)=>{
        this.currentUser =data
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
    this.branchServ.GetReservationByID(this.ID).subscribe({
      next:(data)=>{
        this.reserveData=data
        this.reserveData.checkInDate = this.reserveData.checkInDate.split('T')[0]
        this.reserveData.checkOutDate = this.reserveData.checkOutDate.split('T')[0]
        this.myvalid=new FormGroup({
          checkInDate:new FormControl(this.reserveData.checkInDate,Validators.required),
          checkOutDate:new FormControl(this.reserveData.checkOutDate,Validators.required),
          branch: new FormControl(0,Validators.required),
          roomId: new FormControl(0,Validators.required),
          roomsNo:new FormControl(this.reserveData.roomsNo,Validators.required)
        })
      },
      complete:()=>{
          this.branchServ.getBranches().subscribe({
            next:(data)=>{
              this.branches=data
            }
          })
      }
    })
    }
  getData(value:any){
    this.branchServ.GetRoomsByBranchID(+value).subscribe({
      next:(data)=>{
        this.Rooms = data
      }
    })
  }
  sendData(){
    this.branchServ.getBranchById(+this.myvalid.value.branch).subscribe({
     next:(data)=>{
      this.branchName = data
      this.branchName = this.branchName.name
      this.branchServ.GetRoomsByID(this.myvalid.value.roomId || 0).subscribe({
        next:(data)=>{
          this.SelectedRoom=data
        },
        complete:()=>{
          let totalPrice=this.SelectedRoom.basePrice*(+(this.myvalid.value.roomsNo || 0))
          
        let updatedReserv = {...this.myvalid.value,roomPrice:this.SelectedRoom.basePrice,totalPrice:totalPrice,userId:this.currentUser._id,branchName:this.branchName}
        this.branchServ.updateReserv(this.ID,updatedReserv).subscribe({
          next:(data)=>{
            this.test = data
            alert(this.test.message)
            this.router.navigateByUrl(`reservedetails/${this.currentUser._id}`)
          }
        })
        }
      })
     } 
    })
    
  }
}
