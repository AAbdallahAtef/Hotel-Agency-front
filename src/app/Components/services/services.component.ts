import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [HttpClientModule],
  providers:[UserService],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit{
  constructor(private userServ:UserService,private router:Router){}
  currentUser:any;
  loading:boolean=true;
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
        this.loading = false 
      }
    })
  }

}
