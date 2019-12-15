import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book.model';
import { WishlishHttpService } from './wishlist-http.service';
import { WishlistService } from './wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist:Book[];
  constructor(
    private wishlistHttpService:WishlishHttpService,
    private wishlistService:WishlistService) { }

  ngOnInit() {
    if(this.wishlistService.getWishlist().length===0)
    {
      this.wishlistHttpService.fetchWishlist()
      .subscribe((books:Book[])=>
      {
        this.wishlistService.setWishlist(books);
        this.wishlist=this.wishlistService.getWishlist();
      });
    }else{
      this.wishlist=this.wishlistService.getWishlist();
    }

  }
}