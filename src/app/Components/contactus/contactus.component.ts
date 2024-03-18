import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BranchesService } from '../../Services/branches.service';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [HttpClientModule],
  providers:[BranchesService,UserService],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent implements OnInit {
  Branches: any = [];
  currentUser:any;
  loading:boolean=true;
  constructor(private branchesService : BranchesService,private userServ:UserService,private router:Router) {}
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
    this.branchesService.getBranches()
      .subscribe({
        next:(data)=> {
          this.Branches = data;
        },
        error:(err)=>{console.log(err)}
      })
  }
}
