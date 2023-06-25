import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditvariantComponent } from './editvariant.component';

describe('EditvariantComponent', () => {
  let component: EditvariantComponent;
  let fixture: ComponentFixture<EditvariantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditvariantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditvariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
