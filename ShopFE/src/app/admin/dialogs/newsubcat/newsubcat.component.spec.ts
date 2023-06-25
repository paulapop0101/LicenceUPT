import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsubcatComponent } from './newsubcat.component';

describe('NewsubcatComponent', () => {
  let component: NewsubcatComponent;
  let fixture: ComponentFixture<NewsubcatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsubcatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsubcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
