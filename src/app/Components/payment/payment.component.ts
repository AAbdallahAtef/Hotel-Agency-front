import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {render} from 'creditcardpayments/creditCardPayments'
import { BranchesService } from '../../Services/branches.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from '../../Services/rooms.service';
import { UserService } from '../../Services/user.service';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [HttpClientModule],
  providers:[BranchesService,RoomsService,UserService],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
reserveDetails:any;
ID:any;
roomdata:any;
currentUser:any;
loading:boolean=true;
constructor(private http:HttpClientModule , private branchServ:BranchesService , private activRoute:ActivatedRoute,private router:Router,private roomServ:RoomsService,private userServ:UserService) {
this.ID=this.activRoute.snapshot.params['id']
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
        this.reserveDetails=data
        this.reserveDetails.checkInDate=this.reserveDetails.checkInDate.split('T')[0]
        this.reserveDetails.checkOutDate=this.reserveDetails.checkOutDate.split('T')[0]
        render({
          id:"#myPayPalButtons",
          currency:"USD",
          value:this.reserveDetails.totalPrice,
          onApprove:(details)=>{
        alert("Your Payment is Done")
          }    
        })
        this.roomServ.GetRoomByID(this.reserveDetails.roomId).subscribe({
          next:(data)=>{
this.roomdata=data
this.reserveDetails.roomImage=this.roomdata.image
this.reserveDetails.roomType=this.roomdata.type

          }
        })
      }
    })
  }
}
