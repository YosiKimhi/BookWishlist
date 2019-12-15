import { Component, OnInit, Inject } from '@angular/core';
import { Book ,} from '../shared/book.model';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import { WishlistService } from '../wishlist/wishlist.service';
import { WishlishHttpService } from '../wishlist/wishlist-http.service';

export interface DialogData {
  book: Book;
  index: number;
  isWishlist:boolean;
  
}

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  inWishlist:boolean;
  constructor(
    public dialogRef: MatDialogRef<BookDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private wishlistService:WishlistService,
    private wishlistHttpService:WishlishHttpService,
    ) {}


  ngOnInit() {
    if(!this.data.isWishlist){
      this.inWishlist = this.wishlistService.containInWishList(this.data.book);
    }
  }
  
  onAddToWishList(){
    this.wishlistHttpService.storeWishlistBook(this.data.book)
    .subscribe(response=>{
      if(response){
        this.wishlistService.addToWishlist(this.data.book);
        this.dialogRef.close();
      }
    })
  }

  onRemoveFromWishList(){
    this.wishlistHttpService.deleteWishlistBook(this.data.book)
    .subscribe(response=>{
       this.wishlistService.removeBook(this.data.index);
       this.dialogRef.close();
    }
    ,error=>console.log(error));
  }
  
}
