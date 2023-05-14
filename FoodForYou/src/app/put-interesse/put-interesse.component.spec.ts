import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutInteresseComponent } from './put-interesse.component';

describe('PutInteresseComponent', () => {
  let component: PutInteresseComponent;
  let fixture: ComponentFixture<PutInteresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutInteresseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PutInteresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
