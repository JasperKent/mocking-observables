import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BookReview } from '../services/book-review';
import { BookReviewRepositoryService } from '../services/book-review-repository.service';

@Component({
  selector: 'app-all-reviews',
  templateUrl: './all-reviews.component.html',
  styleUrls: ['./all-reviews.component.scss']
})
export class AllReviewsComponent  {

  showAdd = false;

  reviews= this.bookReviewRepositoryService.getReviews();

  constructor(private bookReviewRepositoryService: BookReviewRepositoryService) { }

}
