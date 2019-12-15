import { Component, Input } from '@angular/core';
import { Book } from '../shared/book.model';
import { MatDialog } from '@angular/material';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { Overlay } from '@angular/cdk/overlay';


@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent  {
  @Input() book:Book;
  @Input() index:number;
  @Input() isWishlist:boolean;
 
  constructor( 
    public dialog:MatDialog,
    private overlay: Overlay) { }

  onClickCard(){
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    this.dialog.open(BookDetailsComponent, {
      width: '1300px',
      data: {book: this.book, index: this.index,isWishlist:this.isWishlist},
      scrollStrategy 
    });
  }

}
