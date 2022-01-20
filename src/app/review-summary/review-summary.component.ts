import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BookReview } from '../services/book-review';
import { BookReviewSummaryService } from '../services/book-review-summary.service';

@Component({
  selector: 'app-review-summary',
  templateUrl: './review-summary.component.html',
  styleUrls: ['./review-summary.component.scss']
})
export class ReviewSummaryComponent  {

  summaries = this.bookReviewSummaryService.reviewSummaries;

  constructor(private bookReviewSummaryService: BookReviewSummaryService) { }
}
