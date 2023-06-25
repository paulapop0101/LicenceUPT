import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbaseproductComponent } from './editbaseproduct.component';

describe('EditbaseproductComponent', () => {
  let component: EditbaseproductComponent;
  let fixture: ComponentFixture<EditbaseproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditbaseproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditbaseproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
