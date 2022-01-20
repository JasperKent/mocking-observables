import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookReview } from './book-review';

@Injectable({
  providedIn: 'root'
})
export class BookReviewRepositoryService {

  private reviews$ = new ReplaySubject<BookReview[]>();

  private loadReviews(): void {
    this.httpClient.get<BookReview[]>(`${environment.booksUri}/BookReview`)
    .subscribe(reviews => this.reviews$.next(reviews));
  }

  constructor (private httpClient: HttpClient){
    this.loadReviews();
  }

  getReviews (): Observable<BookReview[]> {
    return this.reviews$;
  }

  addReview (review: BookReview): void{
    this.httpClient.post<any>(`${environment.booksUri}/BookReview`, review)
      .subscribe(result => this.loadReviews());
  }
}

