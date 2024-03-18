import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule,FooterComponent],
  providers:[UserService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  currentUser:any={_id:Number,name:String,email:String,password:String,image:String,isAdmin:Boolean};
  constructor(private router:Router,private  userService: UserService){}
  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next:(data) =>{
        this.currentUser = data
      },
      error:(error)=>{this.currentUser={}}
    });
  }
  onLogout(){
    this.userService.logOut().subscribe({
      next:()=>{
        this.currentUser=null;
        this.router.navigateByUrl("registration")
      }
    });
  }
  onLogin(){
    this.router.navigate(['regestration'])
  }
}
