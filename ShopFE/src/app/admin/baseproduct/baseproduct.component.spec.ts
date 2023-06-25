import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseproductComponent } from './baseproduct.component';

describe('BaseproductComponent', () => {
  let component: BaseproductComponent;
  let fixture: ComponentFixture<BaseproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
