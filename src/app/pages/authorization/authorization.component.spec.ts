import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationComponent } from './authorization.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

import { FormGroup, FormBuilder } from '@angular/forms';


describe('AuthorizationComponent', () => {
  let component: AuthorizationComponent;
  let fixture: ComponentFixture<AuthorizationComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationComponent ],
      imports:[
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers:[
        {provide: Auth, useValue:{}},
        {provide: Firestore, useValue:{}},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    formBuilder = TestBed.inject(FormBuilder);
    
  });

  let logSpy: jasmine.Spy;

  beforeEach(() => {
    logSpy = spyOn(console, 'log');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  // it('should call log() with correct email and password', () => {
  //   const email = 'test@example.com';
  //   const password = 'password';

  //   spyOn(component, 'log').and.returnValue(Promise.resolve());

  //   component.authForm.setValue({ email, password });
  //   component.login();

  //   expect(component.log).toHaveBeenCalledWith(email, password);
  // });

  // it('should log "login done" on successful login', async () => {
  //   spyOn(component, 'log').and.returnValue(Promise.resolve());

  //   await component.login();

  //   expect(console.log).toHaveBeenCalledWith('login done');
  // });

  // it('should log "login error" on failed login', async () => {
  //   const error = new Error('Login failed');

  //   spyOn(component, 'log').and.returnValue(Promise.reject(error));

  //   await component.login();

  //   expect(console.log).toHaveBeenCalledWith('login error', error);
  // });
  it('should call log() with correct email and password', () => {
    const email = 'test@example.com';
    const password = 'password';

    spyOn(component, 'log').and.returnValue(Promise.resolve());

    component.authForm.setValue({ email, password });
    component.login();

    expect(component.log).toHaveBeenCalledWith(email, password);
  });

  it('should log "login done" on successful login', async () => {
    spyOn(component, 'log').and.returnValue(Promise.resolve());

    await component.login();

    expect(logSpy).toHaveBeenCalledWith('login done');
  });

  
  
});
