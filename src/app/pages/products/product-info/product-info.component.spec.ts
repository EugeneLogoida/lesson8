import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoComponent } from './product-info.component';
import {ActivatedRoute} from "@angular/router";

xdescribe('ProductInfoComponent', () => {
  let component: ProductInfoComponent;
  let fixture: ComponentFixture<ProductInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInfoComponent ],
      imports:[

      ],
      providers:[
        {provide: ActivatedRoute, useValue:{}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
