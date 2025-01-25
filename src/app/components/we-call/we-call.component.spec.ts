import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeCallComponent } from './we-call.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";

describe('WeCallComponent', () => {
  let component: WeCallComponent;
  let fixture: ComponentFixture<WeCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeCallComponent ],
      imports:[
        ReactiveFormsModule,

      ],
      providers:[
        {provide: ActivatedRoute, useValue:{}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
