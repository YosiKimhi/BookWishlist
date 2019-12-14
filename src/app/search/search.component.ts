import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BooksHttpService } from '../shared/books-http.service';
import { Book } from '../shared/book.model';
import {debounceTime,map,distinctUntilChanged,filter} from "rxjs/operators";
import { fromEvent } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PageData } from '../shared/page-data.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  books:Book[];
  error:string=null;
  isloading=false;
  pageData:PageData;
  @ViewChild('booksSearch',{static: true}) booksSearch: ElementRef;
  constructor(
    private booksHttp:BooksHttpService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    var InputText:string=null;
    var page = +this.route.snapshot.queryParams['page'] || 1;
    console.log(page);
    fromEvent(this.booksSearch.nativeElement, 'keyup')
    .pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(600),
      distinctUntilChanged())
      .subscribe((text: string) => {
        this.isloading=true;
        this.books=null;
        this.error=null;
        if(!text || text===''){
          this.isloading=null;
          return;
        }
        InputText=text;
        this.router.navigate(['/search'])
        this.booksHttp.fetchBooks(text,page)
        .subscribe(books=>{
          this.books=books;
          this.isloading=false;
          this.pageData=this.booksHttp.pageData;
          console.log(this.pageData)
          },err=>{
          this.books=null;
          this.error=err;
          this.isloading=false;
        });
    });
    // This is for pagination links in template
    this.route.queryParams
    .subscribe(
      (queryParams: Params)=>{
        if(InputText && +queryParams['page']){
          this.booksHttp.fetchBooks(InputText,+queryParams['page'])
          .subscribe(books=>{
            this.books=books;
            this.isloading=false;
            this.pageData=this.booksHttp.pageData;
            this.error=null;
            console.log(this.pageData)
            },err=>{
            this.books=null;
            this.error=err;
            this.isloading=false;
        });
        }
        
      }
    );
  }
}
