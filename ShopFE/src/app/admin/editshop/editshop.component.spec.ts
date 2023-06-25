import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditshopComponent } from './editshop.component';

describe('EditshopComponent', () => {
  let component: EditshopComponent;
  let fixture: ComponentFixture<EditshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditshopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
