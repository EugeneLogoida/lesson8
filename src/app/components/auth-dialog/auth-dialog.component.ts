import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { ROLE } from 'src/app/shared/constants/roles.constant';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';


export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmationPassword?: string;
}
@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {

  public authForm!: FormGroup;
  public registerForm!: FormGroup;
  public isLogin = true;

  public checkPassword = false;
  private registerData!: IRegister;

  constructor(

    private auth: Auth,
    private afs: Firestore,
    private router: Router,
    private accountService: AccountService,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.initAuthForm();
    this.initRegisterForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }
  initRegisterForm(): void {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      fName: [null, [Validators.required]],
      lName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      confirmedPassword: [null, [Validators.required]]
    })
  }

  loginUser(): void{
    const { email, password } = this.authForm.value;
    this.log(email, password).then(() => {
      console.log('login done');
    }).catch(e => {
      console.log('login error', e);

    })
  }
  async log(email:string, password:string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    console.log(credential.user.uid);
    docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {

      const currentUser = {...user, uid: credential.user.uid};
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if(user && user.role === ROLE.USER){
        this.router.navigate(['/cabinet'])
      } else if(user && user.role === ROLE.ADMIN) {
        this.router.navigate(['/admin'])
      }

      this.accountService.isUserLogin$.next(true);
      console.log('user', user);
    }, (e) => {
      console.log('error', e);
      }
    )


  }

  registerUser():void{
    const{ email, password } = this.registerForm.value;
    this.emailSignUp(email, password).then(() => {
      console.log('sing up done');
      this.registerForm.reset();

    }).catch(e => {
      console.log('sing up error', e);

    })
  }

  async emailSignUp(email:string, password:string): Promise<any>{
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    console.log(credential);
    const user = {
      email: credential.user.email,
      firstName: this.registerForm.value.fName,
      lastName: this.registerForm.value.lName,
      phoneNumber: this.registerForm.value.phoneNumber,
      address: '',
      orders: [],
      role: 'USER'
    };

    setDoc(doc(this.afs, 'users', credential.user.uid), user);
  }


  changeIsLogin(){
    this.isLogin = !this.isLogin
  }

  checkConfirmedPassword(): void {
    this.checkPassword = this.password.value === this.confirmed.value;
    if(this.password.value !== this.confirmed.value) {
      this.registerForm.controls['confirmedPassword'].setErrors({
        matchError: 'Password confirmation doesnt match'
      })
    }
  }

  get password(): AbstractControl {
    return this.registerForm.controls['password'];
  }

  get confirmed(): AbstractControl {
    return this.registerForm.controls['confirmedPassword'];
  }

  checkVisibilityError(control: string, name: string): boolean | null {
    return this.registerForm.controls[control].errors?.[name]
  }

}
