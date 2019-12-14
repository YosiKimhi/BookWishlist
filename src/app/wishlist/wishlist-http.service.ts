import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Book } from '../shared/book.model';

@Injectable({providedIn:'root'})
export class WishlishHttpService {
    
    constructor(
        private http:HttpClient,
        private authService:AuthService){}

    storeWishlistBook(book:Book){
        return this.authService.user.pipe(take(1),exhaustMap(user=>{
            return this.http.put(`https://bookswishlist-471ea.firebaseio.com/wishlists/${user.id}/books/${book.id}.json`,book,
            {
                params:new HttpParams().set('auth',user.token)
            })
        }))
    }
    deleteWishlistBook(book:Book){
        return this.authService.user.pipe(take(1),exhaustMap(user=>{
            return this.http.delete(`https://bookswishlist-471ea.firebaseio.com/wishlists/${user.id}/books/${book.id}.json`,
            {
                params:new HttpParams().set('auth',user.token)
            })
        }))
    }
    fetchWishlist(){
        return this.authService.user.pipe(take(1),exhaustMap(user=>{
            return this.http.get(`https://bookswishlist-471ea.firebaseio.com/wishlists/${user.id}/books.json`,
            {
                params:new HttpParams().set('auth',user.token)
            })
        }), map(responseData=>{
                const booksArray:Book[]=[];
                for(const key in responseData)
                {
                    if(responseData.hasOwnProperty(key))
                    {
                        booksArray.push({...responseData[key], id:key})
                    }
                } 
                return booksArray;
            })
        );
    }

}