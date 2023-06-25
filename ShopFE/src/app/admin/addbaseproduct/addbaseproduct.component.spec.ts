import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbaseproductComponent } from './addbaseproduct.component';

describe('AddbaseproductComponent', () => {
  let component: AddbaseproductComponent;
  let fixture: ComponentFixture<AddbaseproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddbaseproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddbaseproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
