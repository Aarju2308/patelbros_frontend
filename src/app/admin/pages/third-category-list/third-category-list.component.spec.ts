import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdCategoryListComponent } from './third-category-list.component';

describe('ThirdCategoryListComponent', () => {
  let component: ThirdCategoryListComponent;
  let fixture: ComponentFixture<ThirdCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdCategoryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThirdCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
