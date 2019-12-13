import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BooksHttpService } from '../shared/books-http.service';
import { Book } from '../shared/book.model';
import {debounceTime,map,distinctUntilChanged,filter} from "rxjs/operators";
import { fromEvent } from 'rxjs';
import { WishlistService } from '../wishlist/wishlist.service';
import { WishlishHttpService } from '../wishlist/wishlist-http.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  books:Book[];
  error:string=null;
  isloading=false;
  @ViewChild('booksSearch',{static: true}) booksSearch: ElementRef;
  constructor(
    private booksHttp:BooksHttpService,
    private wishlistHttpService:WishlishHttpService,
    private wishlistService:WishlistService) { }

  ngOnInit() {
    fromEvent(this.booksSearch.nativeElement, 'keyup')
    .pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(350),
      distinctUntilChanged())
      .subscribe((text: string) => {
        this.isloading=true;
        this.books=null;
        this.error=null;
        if(!text || text===''){
          this.isloading=null;
          return;
        }
        this.booksHttp.fetchBooks(text)
        .subscribe(books=>{
        this.books=books;
        this.isloading=false;
      },err=>{
        this.books=null;
        this.error=err;
        this.isloading=false;
      })
    });
  }

}
