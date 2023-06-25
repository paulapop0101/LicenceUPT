import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewvalueComponent } from './newvalue.component';

describe('NewvalueComponent', () => {
  let component: NewvalueComponent;
  let fixture: ComponentFixture<NewvalueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewvalueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
