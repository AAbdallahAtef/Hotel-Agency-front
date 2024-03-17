import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RoomsService } from '../../Services/rooms.service';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-roomdetails',
  standalone: true,
  imports: [HttpClientModule,RouterModule,FontAwesomeModule,ReactiveFormsModule],
  providers:[RoomsService,UserService],
  templateUrl:'./roomdetails.component.html',
  styleUrl: './roomdetails.component.css'
})
export class RoomdetailsComponent implements OnInit {
ID:any;
roomdetails:any;
Reviews:any;
AddedReviews:any={}
rating:any;
currentUser:any;
loading:boolean=true;
constructor(myActivated:ActivatedRoute,private roomServ:RoomsService,private router:Router,private userServ:UserService) {
this.ID=myActivated.snapshot.params["id"]
}
ReadReviews=new FormGroup({
  rating:new FormControl("",Validators.max(5)),
  author:new FormControl("",Validators.required),
  date: new FormControl("",Validators.required),
  text: new FormControl("",Validators.required),
  imageUrl:new FormControl("",Validators.required)
})
  ngOnInit(): void {
    this.userServ.getCurrentUser().subscribe({
      next:(data)=>{
        this.currentUser =data
        if(!this.currentUser.isAdmin){
          this.loading = false;
        }
        else{
          this.router.navigateByUrl('home'); 
        }
      },
      error:()=>{
        alert('Please login first');
        this.router.navigateByUrl('registration')  
      }
    })
  this.roomServ.GetRoomByID(this.ID).subscribe({
  next:(data)=>{
  this.roomdetails=data
  this.roomServ.GetReviewsByID(this.ID).subscribe({
  next:(data)=>{
    this.Reviews=data
    console.log(this.Reviews)
  }

})     

}

    })
  }
  AddReviews(){
    this.AddedReviews={...this.ReadReviews.value,roomId:+this.ID}
    this.roomServ.AddReviews(this.AddedReviews).subscribe({
      next:(data)=>{
      this.rating=data
      this.Reviews.push(this.rating.data)
      }
    })
    } 

}
