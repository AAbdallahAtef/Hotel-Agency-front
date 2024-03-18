import { Component, OnInit } from '@angular/core';
import { BranchesService } from '../../Services/branches.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RoomsService } from '../../Services/rooms.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdatereserveComponent } from '../updatereserve/updatereserve.component';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-reserve-details',
  standalone: true,
  imports: [HttpClientModule,RouterModule,ReactiveFormsModule,UpdatereserveComponent],
  providers:[BranchesService,RoomsService],
  templateUrl: './reserve-details.component.html',
  styleUrl: './reserve-details.component.css'
})
export class ReserveDetailsComponent implements OnInit{
  ID:any;
  UserReserve:any=[]
  currentUser:any;
  Rooms:any=[]
  message:undefined|string;
  deleted:any;
  waiting:boolean=true;
  roomData:any;
  loading:boolean=true;
  constructor(private branchServ:BranchesService,private userService:UserService,private activate:ActivatedRoute, private roomServ:RoomsService,private router:Router){
  this.ID=activate.snapshot.params['id']
  }
  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
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
        alert('please login first');
        this.router.navigateByUrl('registration')
      }
    });


   this.branchServ.GetReserveByUserID(this.ID).subscribe({
    next:(data)=>{
       this.UserReserve=data
       this.displayReservation()
    }
   })
  }
  displayReservation(){
    if(this.UserReserve.message){
      alert('No reservations found please make a reservation first')
      this.router.navigate(['reservation'])
    }else{
      this.waiting=false
      this.UserReserve.map((el:any)=>{
       el.checkInDate=el.checkInDate.split('T')[0]
       el.checkOutDate = el.checkOutDate.split('T')[0]
       this.roomServ.GetRoomByID(el.roomId).subscribe({
         next:(data)=>{
           this.roomData=data
           el.roomImage=this.roomData.image
           el.roomType=this.roomData.type
         }
       })
      })
    }
  }
   DeleteReserve(id:any){
    this.branchServ.DeleteReserve(id).subscribe({
      next:(data)=>{
        this.UserReserve=data
        this.UserReserve=this.UserReserve.data
         this.displayReservation()
      }
    })
  }
  UpdateReserve(id:any){
    this.router.navigateByUrl(`updatereserve/${id}`)
  }
}
