import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutComentarioComponent } from './put-comentario.component';

describe('PutComentarioComponent', () => {
  let component: PutComentarioComponent;
  let fixture: ComponentFixture<PutComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutComentarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PutComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
