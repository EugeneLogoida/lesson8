import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { ActionsComponent } from './actions.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActionsService } from 'src/app/shared/services/actions/actions.service';
import { IActionsResponse } from 'src/app/shared/interfaces/actions/actions.interface';


describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;
  let actionsService: ActionsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsComponent ],
      imports:[
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    actionsService = TestBed.inject(ActionsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load actions list on initialization', () => {
    const mockResponse: IActionsResponse[] = [
      
    ];

    spyOn(actionsService, 'getAll').and.returnValue(of(mockResponse));

    component.loadActions();

    expect(actionsService.getAll).toHaveBeenCalled();
    expect(component.actionsList).toEqual(mockResponse);
  });

//   Statements   : 42.46% ( 203/478 )
// Branches     : 8.88% ( 8/90 )
// Functions    : 41.36% ( 79/191 )
// Lines        : 38.81% ( 170/438 )

//   Statements   : 42.25% ( 202/478 )
// Branches     : 8.88% ( 8/90 )
// Functions    : 40.83% ( 78/191 )
// Lines        : 38.58% ( 169/438 )
});
