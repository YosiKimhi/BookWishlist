import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Book } from './book.model';
import { catchError } from 'rxjs/operators';
import {throwError } from 'rxjs';

@Injectable({providedIn:'root'})
export class BooksHttpService{
    APIkey='AIzaSyBNn2rgNs_hQRlO2iOJCuJUnPlsjtO2rXw';
    constructor(private http:HttpClient){}
    fetchBooks(booksSearch:string){
        //Set Params!
        let searchParams = new HttpParams();
        searchParams= searchParams.append('q',booksSearch);
        searchParams= searchParams.append('maxResults','20');
        searchParams= searchParams.append('projection','full');
        searchParams= searchParams.append('key',this.APIkey);
        return this.http.get('https://www.googleapis.com/books/v1/volumes',{
            params: searchParams
        })
        .pipe(
            //editing response data
            map(responseData=>{
                const booksArray:Book[]=[];
                for(var i=0;i<responseData['items'].length;i++){
                    booksArray.push(new Book(
                        responseData['items'][i]['id'],
                        responseData['items'][i]['volumeInfo']['title'],
                        responseData['items'][i]['volumeInfo']['authors'],
                        responseData['items'][i]['volumeInfo']['description'],
                        responseData['items'][i]['volumeInfo']['categories'],
                        responseData['items'][i]['volumeInfo']['publisher'],
                        responseData['items'][i]['volumeInfo']['imageLinks']['thumbnail'],
                        responseData['items'][i]['volumeInfo']['language'],
                        responseData['items'][i]['volumeInfo']['ratingsCount']
                        ))
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
}