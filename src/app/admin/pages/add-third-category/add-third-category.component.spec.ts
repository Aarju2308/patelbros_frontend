import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThirdCategoryComponent } from './add-third-category.component';

describe('AddThirdCategoryComponent', () => {
  let component: AddThirdCategoryComponent;
  let fixture: ComponentFixture<AddThirdCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddThirdCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddThirdCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
