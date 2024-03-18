import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from '../../Services/dashboard.service';
import { BranchesService } from '../../Services/branches.service';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';

Chart.register(...registerables)

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule],
  providers: [DashboardService,BranchesService,UserService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private DashboardServ: DashboardService , private BranchServ:BranchesService,private userService:UserService,private router:Router) { }

  AllUsers: any = []
  usersNum: any
  branchData:any;
  roomWithBranch:any;
  AllReviews: any = []
  reviewsNum: any

  rating: any = []
  AllRooms: any = []
  AllRoomsRating:any=[]
  AllRoomsQty:any=[]
  AllRoomsType:any=[]

  RoomsNum: any
  roomType: any = []
  roomQuantity: any = []
  currentUser:any;
  loading:boolean=true;

  AllRoomsOfBranchOne: any = []
  AllRoomsOfBranchTwo: any = []
  AllRoomsOfBranchThree: any = []

  roomTwoType: any = []
  roomTwoRating: any = []
  roomTwoQuantity: any = []

  roomThreeType: any = []
  roomThreeRating: any = []
  roomThreeQuantity: any = []

  numOfBranchOne: any = []
  numOfBranchTwo: any = []
  numOfBranchThree: any = []
  myLineChart:any;
  RenderLineChart() {
    this.myLineChart = new Chart("myAreaChart", {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Earnings",
          backgroundColor: "#107980",
          borderColor: "#107980",
          fill: false,
          data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000],
        }],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }
        },
      }
    });
  }
  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next:(data)=>{
        this.currentUser =data
        if(this.currentUser.isAdmin){
            setTimeout(()=>{
           this.RenderLineChart()
            },200)
          this.displayData()
          this.loading = false 
        }
        else{
          alert('You are not authorized to view this page');
          this.router.navigateByUrl('home')    
        }
      },
      error:()=>{
        alert('Please login first');
        this.router.navigateByUrl('registration')  
      }
    })
  }

  displayData(){


    this.DashboardServ.getDashboardUsers().subscribe({

      next: (data) => {
        this.AllUsers = data;
        this.usersNum = this.AllUsers.length
      },
      error: (err) => { console.log(err) }
    })

    this.DashboardServ.getDashboardRviews().subscribe({

      next: (data) => {
        this.AllReviews = data;
        this.reviewsNum = this.AllReviews.length

      },
      error: (err) => { console.log(err) }
    })

    this.DashboardServ.getDashboardRooms().subscribe({
      next:(data) => {
        this.AllRooms = data;
        this.RoomsNum = this.AllRooms.length
        for (let i = 0; i < this.AllRooms.length; i++) {
           this.BranchServ.getBranchById(this.AllRooms[i].branchId).subscribe({
            next:(data)=>{
              this.branchData = data
              this.roomWithBranch = this.AllRooms[i].type + "-" + this.branchData.name
              
              this.AllRoomsType.push(this.roomWithBranch)
              this.AllRoomsRating.push(this.AllRooms[i].rating)
              this.AllRoomsQty.push(this.AllRooms[i].quantity)
            }
          })
        
        }
       setTimeout(()=>{
        this.RenderChartAllRooms()
       },4000)
      },
      error: (err) => { console.log(err) }
    })


    this.DashboardServ.getBranchOneRooms().subscribe({

      next: (data) => {

        this.AllRoomsOfBranchOne = data;
        this.numOfBranchOne = this.AllRoomsOfBranchOne.length;

        for (let i = 0; i < this.AllRoomsOfBranchOne.length; i++) {

          this.roomType.push(this.AllRoomsOfBranchOne[i].type)
          this.rating.push(this.AllRoomsOfBranchOne[i].rating)
          this.roomQuantity.push(this.AllRoomsOfBranchOne[i].quantity)
        }
      },
      error: (err) => { console.log(err) }
    })

    this.DashboardServ.getBranchTwoRooms().subscribe({

      next: (data) => {

        this.AllRoomsOfBranchTwo = data;
        this.numOfBranchTwo = this.AllRoomsOfBranchTwo.length;

        for (let i = 0; i < this.AllRoomsOfBranchTwo.length; i++) {

          this.roomTwoType.push(this.AllRoomsOfBranchTwo[i].type)
          this.roomTwoRating.push(this.AllRoomsOfBranchTwo[i].rating)
          this.roomTwoQuantity.push(this.AllRoomsOfBranchTwo[i].quantity)
        }
      },
      error: (err) => { console.log(err) }
    })

    this.DashboardServ.getBranchThreeRooms().subscribe({
      next: (data) => {

        this.AllRoomsOfBranchThree = data;
        this.numOfBranchThree = this.AllRoomsOfBranchThree.length;

        for (let i = 0; i < this.AllRoomsOfBranchThree.length; i++) {

          this.roomThreeType.push(this.AllRoomsOfBranchThree[i].type)
          this.roomThreeRating.push(this.AllRoomsOfBranchThree[i].rating)
          this.roomThreeQuantity.push(this.AllRoomsOfBranchThree[i].quantity)
        }
        setTimeout(()=>{
          this.RenderDoughnutChart()
         },1000)
      },
      error: (err) => { console.log(err) }
    })
  }


  RenderDoughnutChart(){
    var myPieChart = new Chart("myPieChart", {
      type: 'doughnut',
      data: {
        labels: ["London", "New York", "Tokyo"],
        datasets: [{
          data: [this.numOfBranchOne, this.numOfBranchTwo, this.numOfBranchThree],
          backgroundColor: ['#107980', '#1cc88a', '#D9C5BC'],
          hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
      },
   
    });
  }

  RenderChartAllRooms(){
    const myChart = new Chart("myChartRooms", {
      type: 'bar',
      data: {
        labels: this.AllRoomsType,
        datasets: [
          {
            label: ' Room Rating',
            data: this.AllRoomsRating,
            backgroundColor: '#107980',
            borderWidth: 1
          },
          {
            label: ' Room Quantity',
            data: this.AllRoomsQty,
            backgroundColor: '#D9C5BC',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}



