import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Book } from './book.model';
import { catchError } from 'rxjs/operators';
import {throwError } from 'rxjs';
import { PageData } from './page-data.model';

@Injectable({providedIn:'root'})
export class BooksHttpService{
    APIkey='AIzaSyBNn2rgNs_hQRlO2iOJCuJUnPlsjtO2rXw';
    pageData:PageData; 
    constructor(private http:HttpClient){}
    fetchBooks(booksSearch:string,page:number){
        //Prepering for pagination
        var limit=20;
        var startIndex=(page-1)*limit;
        var startIndexStr=startIndex.toString();
        //Set Params!
        let searchParams = new HttpParams();
        searchParams= searchParams.append('q',booksSearch);
        searchParams= searchParams.append('maxResults','20');
        searchParams= searchParams.append('startIndex',startIndexStr);
        searchParams= searchParams.append('projection','full');
        searchParams= searchParams.append('key',this.APIkey);
        // let headers = new HttpHeaders();
        
        
        return this.http.get('https://www.googleapis.com/books/v1/volumes',{
            params: searchParams
            // headers:headers
        })
        .pipe(
            tap(responseData=>{
                var totalItems=+responseData['totalItems'];
                this.pageData = new PageData(
                    page,
                    limit*page<totalItems,
                    page>1,
                    page+1,
                    page-1,
                    Math.ceil(totalItems/limit)
                    )
            }),
            //editing response data
            map(responseData=>{
                const booksArray:Book[]=[];
                for(let i=0;i<responseData['items'].length;i++){
                    if(responseData['items'][i]['volumeInfo']['imageLinks']){
                        booksArray.push(new Book(
                            responseData['items'][i]['id'],
                            responseData['items'][i]['volumeInfo']['title'],
                            responseData['items'][i]['volumeInfo']['authors'],
                            responseData['items'][i]['volumeInfo']['description'],
                            responseData['items'][i]['volumeInfo']['categories'],
                            responseData['items'][i]['volumeInfo']['publisher'],
                            responseData['items'][i]['volumeInfo']['imageLinks']['thumbnail'].replace('http','https'),
                            responseData['items'][i]['volumeInfo']['previewLink'].replace('http','https'),
                            responseData['items'][i]['volumeInfo']['language'],
                            responseData['items'][i]['volumeInfo']['ratingsCount']
                            ))
                    }else{ //if there in no cover for the books
                        booksArray.push(new Book(
                            responseData['items'][i]['id'],
                            responseData['items'][i]['volumeInfo']['title'],
                            responseData['items'][i]['volumeInfo']['authors'],
                            responseData['items'][i]['volumeInfo']['description'],
                            responseData['items'][i]['volumeInfo']['categories'],
                            responseData['items'][i]['volumeInfo']['publisher'],
                            'https://books.google.co.il/googlebooks/images/no_cover_thumb.gif',
                            responseData['items'][i]['volumeInfo']['previewLink'].replace('http','https'),
                            responseData['items'][i]['volumeInfo']['language'],
                            responseData['items'][i]['volumeInfo']['ratingsCount']
                            ))
                    }
                    
                }
                return booksArray;
            }),catchError(errorRes=>{
                let errorMessage="No books match found!";
                if(errorRes){
                    return throwError(errorMessage);
                }
            })
        );
    }
    clearPageData(){
        this.pageData = null
    }
}