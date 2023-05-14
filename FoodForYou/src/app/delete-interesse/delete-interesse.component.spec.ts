import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInteresseComponent } from './delete-interesse.component';

describe('DeleteInteresseComponent', () => {
  let component: DeleteInteresseComponent;
  let fixture: ComponentFixture<DeleteInteresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteInteresseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteInteresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
