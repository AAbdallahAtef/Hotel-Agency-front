import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { RoomsComponent } from './Components/rooms/rooms.component';
import { RoomdetailsComponent } from './Components/roomdetails/roomdetails.component';
import { ErrorComponent } from './Components/error/error.component';
import { FoodPageComponent } from './Components/food-page/food-page.component';
import { ContactusComponent } from './Components/contactus/contactus.component';
import { RegestrationComponent } from './Components/regestration/regestration.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ReservationComponent } from './Components/reservation/reservation.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { ReserveDetailsComponent } from './Components/reserve-details/reserve-details.component';
import { UpdatereserveComponent } from './Components/updatereserve/updatereserve.component';
import { ServicesComponent } from './Components/services/services.component';
import { RoomsAdminComponent } from './Components/rooms-admin/rooms-admin.component';
import { UpdateDeleteComponent } from './Components/update-delete/update-delete.component';
import { AboutComponent } from './Components/about/about.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';



export const routes: Routes = [
{path: "", redirectTo:"home", pathMatch:"full"}, 
{path:"registration", component:RegestrationComponent},
{path:"", component:NavbarComponent, children:[
{path:"home", component:HomeComponent},
{path:"about",component:AboutComponent},
{path:"rooms", component:RoomsComponent},
{path:"rooms/:id",component:RoomdetailsComponent},
{path:"services",component:ServicesComponent},
{path:"food",component:FoodPageComponent},
{path:'update/:id',component:UpdateDeleteComponent},
{path:'roomsadmin',component:RoomsAdminComponent},
{path:"contact",component:ContactusComponent},
{path:"reservation",component:ReservationComponent},
{path:"payment/:id",component:PaymentComponent},
{path:"reservedetails/:id",component:ReserveDetailsComponent},
{path:"updatereserve/:id",component:UpdatereserveComponent},
{path:"dashboard",component:DashboardComponent},
{path:"**",component:ErrorComponent}

]}
];
