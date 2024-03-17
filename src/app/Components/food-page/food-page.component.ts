import { Component } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { DishesService } from '../../Services/dishes.service';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-page',
  standalone: true,
  providers:[DishesService,UserService],
  imports: [HttpClientModule],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css'
})
export class FoodPageComponent {
  Dishes: any = [];
  currentUser:any;
  loading:boolean=true
  constructor(private dishesServ: DishesService,private userServ:UserService,private router:Router) {}
  ngOnInit(): void {
    this.userServ.getCurrentUser().subscribe({
      next:(data)=>{
        this.currentUser = data
        this.loading = false 
      },
      error:()=>{
        alert('Please login first');
        this.router.navigateByUrl('registration')  
      }
    })
    this.dishesServ.getDishList().subscribe({
        next:(data)=> {
          this.Dishes = data;
        },
        error:(err)=>{console.log(err)}
    })
  }

}
