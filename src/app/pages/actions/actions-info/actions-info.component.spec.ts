import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsInfoComponent } from './actions-info.component';
import { ActivatedRoute } from "@angular/router";

xdescribe('ActionsInfoComponent', () => {
  let component: ActionsInfoComponent;
  let fixture: ComponentFixture<ActionsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsInfoComponent ],
      providers:[
        {provide: ActivatedRoute, useValue:{}},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
