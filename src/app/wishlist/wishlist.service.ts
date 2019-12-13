import { Injectable } from '@angular/core';
import { Book } from '../shared/book.model';

@Injectable({providedIn:'root'})
export class WishlistService {

    private wishlist: Book[]=[];
    
    addToWishlist(book:Book){
        this.wishlist.push(book);
    }
    containInWishList(book:Book){
        for(var i=0;i<this.wishlist.length;i++){
            if(this.wishlist[i].id===book.id){
                return true;
            }
        }
        return false;
    }

    getWishlist(){
        return this.wishlist;
    }

    setWishlist(books:Book[]){
        this.clearWishlist()
        this.wishlist.push(...books)
    }
    
    removeBook(index:number){
        this.wishlist.splice(index,1);
    }
    
    clearWishlist(){
        this.wishlist=[];
    }
}