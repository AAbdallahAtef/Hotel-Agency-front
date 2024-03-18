import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BranchesService } from '../../Services/branches.service';
import { UserService } from '../../Services/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [RouterModule,FormsModule,ReactiveFormsModule,HttpClientModule],
  providers:[BranchesService,UserService],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})

export class ReservationComponent implements OnInit {
constructor(private branchServ:BranchesService,private userServ:UserService , private router:Router){}
selected=""
Branches:any=[]
Rooms:any=[]
SelectedRoom:any={}
SelectedBranch:any={}
currentUser:any;
YourCart:any;
schema:any;
res:any={}
loading:boolean=true;
ReserveRoom=new FormGroup({
  checkInDate:new FormControl("",Validators.required),
  checkOutDate:new FormControl("",Validators.required),
  branch: new FormControl("Select Branch",Validators.required),
  roomId: new FormControl(0,Validators.required),
  roomsNo:new FormControl("",Validators.required)
})

roomofbranch:any=[]
ngOnInit(): void {
  this.branchServ.getBranches().subscribe({
    next:(data)=>{
      this.Branches=data
    },error:(err)=>{console.log(err);
    }
  })

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
}
getData(data:any){
  this.selected=data
  this.branchServ.GetRoomsByBranchID(+this.selected).subscribe({
next:(data)=>{
  this.roomofbranch=data
}
  })
}

 ReserveRooms(){
  let totalPrice=0;
  
   this.branchServ.GetRoomsByID(this.ReserveRoom.value.roomId || 0).subscribe({
    next: (data)=>{
      this.SelectedRoom=data
      totalPrice=this.SelectedRoom.basePrice*(+(this.ReserveRoom.value.roomsNo || 0))
      this.branchServ.getBranchById(this.ReserveRoom.value.branch).subscribe({
        next:(value)=>{
          this.SelectedBranch = value
          this.schema={
            checkInDate:this.ReserveRoom.value.checkInDate,
            userId:this.currentUser._id,
            checkOutDate:this.ReserveRoom.value.checkOutDate,
            roomId:this.ReserveRoom.value.roomId,
            roomsNo:this.ReserveRoom.value.roomsNo,
            roomPrice:this.SelectedRoom.basePrice,
            totalPrice:totalPrice,
            branchName:this.SelectedBranch.name
          }    
      this.serv()
        }
      })

    }
  })
}
serv(){
  
  this.branchServ.ReserveRoom(this.schema).subscribe({
    next:(data)=>{
      this.res=data
      
      
     alert(this.res.message)
      if(this.res.message === "Reservation Success"){
       this.YourCart=this.res.data
       this.router.navigateByUrl(`payment/${this.res.data._id}`)
      }
   }
  
    
  })

  
}

}
