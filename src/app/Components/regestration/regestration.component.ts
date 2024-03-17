import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-regestration',
  standalone: true,
  imports: [CommonModule,HttpClientModule,ReactiveFormsModule],
  providers:[UserService],
  templateUrl: './regestration.component.html',
  styleUrl: './regestration.component.css',
})
export class RegestrationComponent implements OnInit{
  // container: any;
  // registerBtn: any;
  // loginBtn: any;
  loading:boolean=true;
  appear:boolean= false;
  res:any;
  
  constructor(private  userService: UserService,private router:Router) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
     next:(data) =>{
      alert('You are already loged in');
      this.router.navigateByUrl('/home')
     },
     error:()=>{
      this.loading = false
     }
   });
  }

  regestration = new FormGroup({
    name:new FormControl("",[Validators.required,Validators.minLength(3)]),
    email: new FormControl("",[Validators.required,Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+(\.com){1}$/)]),
    password: new FormControl("",[Validators.required,Validators.minLength(8)]),
    image:new FormControl(""),
  })

  login = new FormGroup({
    loginEmail: new FormControl("",[Validators.required]),
    loginPassword: new FormControl("",[Validators.required])
  })

  get nameValid(){
    return this.regestration.controls['name'].valid;
  } 

  get emailValid(){
    return this.regestration.controls['email'].valid;
  } 

  get passwordValid(){
    return this.regestration.controls['password'].valid;
  }

  get imageValid(){
    return this.regestration.controls['image'].valid;
  }

  get loginEmailValid(){
    return this.login.controls['loginEmail'].valid
  }

  get loginPasswordValid(){
    return this.login.controls['loginPassword'].valid
  }

  appearDiv(){
    this.appear = !this.appear;
  }

  signUp(){
    if(this.regestration.valid){
      let newUser = {...this.regestration.value,isAdmin:false};
      this.userService.regestration(newUser).subscribe({
        next:(res)=>{
          this.res = res
          alert(this.res.message);
        },
        complete:()=>{
          this.appearDiv()
        }
      })
     }
  }

  signIn(){
    if(this.login.valid){
      let loginUser = {email:this.login.value.loginEmail,password:this.login.value.loginPassword};
      this.userService.login(loginUser).subscribe({
        next:(res)=>{
          this.res = res
          if(Object.keys(this.res).length === 2){
            if(this.res.data.isAdmin){
              this.router.navigateByUrl('dashboard')
            }
            else{
              this.router.navigateByUrl('home')

            }
          }else{
            alert("Wrong email or password")
            this.login.reset();
          }
        }
      })
    }
  }
}
