import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookReview } from '../services/book-review';
import { AllReviewsComponent } from './all-reviews.component';

describe('AllReviewsComponent', () => {
  let component: AllReviewsComponent;
  let fixture: ComponentFixture<AllReviewsComponent>;
  let httpTestingController: HttpTestingController;

  const mockReviews = [
    {
      title: 'book-1',
      rating: 5
    },
    {
      title: 'book-1',
      rating: 1
    },
    {
      title: 'book-2',
      rating: 4
    },
  ] as BookReview[]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllReviewsComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllReviewsComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the correct reviews', () => {
    const request = httpTestingController.expectOne(data =>
      data.url === 'https://localhost:5001/BookReview' && data.method === 'GET'
    );

    request.flush(mockReviews);

    expect(component.reviews).toHaveSize(3);
    expect(component.reviews[0]).toEqual ({ title: 'book-1', rating: 5 });
    expect(component.reviews[1]).toEqual ({ title: 'book-1', rating: 1 });
    expect(component.reviews[2]).toEqual ({ title: 'book-2', rating: 4 });
  });
});
