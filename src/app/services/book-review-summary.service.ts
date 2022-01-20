import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookReview } from './book-review';
import { BookReviewRepositoryService } from './book-review-repository.service';

@Injectable({
  providedIn: 'root'
})
export class BookReviewSummaryService {

  get reviewSummaries(): Observable<BookReview[]> {
    return this.bookReviewRepositoryService
      .getReviews().pipe(
        map(revs => revs.reduce ((reviews, review) => { 
          const item = reviews.find(r => r.title== review.title);
  
          if (item)
            item.ratings.push(review.rating);
          else
            reviews.push ({title: review.title, ratings: [review.rating]});
  
          return reviews;
  
        },[] as {title: string, ratings: number[]}[])
        .map (review => ({
          title: review.title, 
          rating: review.ratings.reduce ((sum, val) => sum += val, 0)/review.ratings.length
        }) as BookReview))
      );
  }

  constructor(private bookReviewRepositoryService: BookReviewRepositoryService) { }
}
