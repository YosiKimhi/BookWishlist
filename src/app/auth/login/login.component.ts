import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { WishlishHttpService } from 'src/app/wishlist/wishlist-http.service';
import { WishlistService } from 'src/app/wishlist/wishlist.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading=false;
  error:string =null;
  constructor(
    private authService:AuthService,
    private wishlistHttpService:WishlishHttpService,
    private wishlistService:WishlistService,
    private router:Router) { }

  ngOnInit() {
  }

  onLogin(form:NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading= true;
    this.authService.loging(email,password).subscribe(
      resData=>{
        this.isLoading= false;
        this.loadWishlist();
        this.router.navigate(['/search']);
        
      },
      errorMessage=>{
        this.error = errorMessage;
        this.isLoading= false;
      })
    
  }
  private loadWishlist(){
    this.wishlistHttpService
    .fetchWishlist()
    .subscribe(wishlist=>{
      this.wishlistService.setWishlist(wishlist);
    
    })
  }

}
