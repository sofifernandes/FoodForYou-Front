import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostInteresseComponent } from './post-interesse.component';

describe('PostInteresseComponent', () => {
  let component: PostInteresseComponent;
  let fixture: ComponentFixture<PostInteresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostInteresseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostInteresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
