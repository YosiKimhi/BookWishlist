import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
    {path: '', redirectTo: '/search',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'search',component:SearchComponent,canActivate:[AuthGuard]},
    {path:'wishlist',component:WishlistComponent,canActivate:[AuthGuard]},
    {path:'not-found',component:PageNotFoundComponent},
    {path:'**',redirectTo:'/not-found'}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }