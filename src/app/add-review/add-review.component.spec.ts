import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AddReviewComponent } from './add-review.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { BookReview } from '../services/book-review';

describe('AddReviewComponent', () => {
  let component: AddReviewComponent;
  let fixture: ComponentFixture<AddReviewComponent>;
  let httpTestingController: HttpTestingController;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReviewComponent ],
      imports: [FormsModule, HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReviewComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should do a POST when review is added', () => {
    component.title = 'book-a';
    component.rating = 4;

    component.addReview();

    const request = httpTestingController.expectOne(data =>
      data.url === 'https://localhost:5001/BookReview' && data.method === 'POST'
    );

    expect (request.request.body).toEqual ({ title: 'book-a', rating: 4 } as BookReview);

    request.flush(1);
    
  });
});
