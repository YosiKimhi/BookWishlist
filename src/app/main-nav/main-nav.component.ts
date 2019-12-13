import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy{
  isAuthenticated=false;
  email:string;
  private userSub:Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService:AuthService) {}
  
  ngOnInit(){
    this.userSub=this.authService.user.subscribe(user=>{
      this.isAuthenticated = !user ? false : true;
      if(this.isAuthenticated){
        this.email = user.email;
      }
      //or  this.isAuthenticated = !!user;
    })
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
  onLogout() {
    this.authService.logout();
  }
}
