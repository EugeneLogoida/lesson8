import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { ROLE } from 'src/app/shared/constants/roles.constant';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {

  public authForm!: FormGroup;
  public isLogin = true;

  constructor(
    
    private auth: Auth,
    private afs: Firestore,
    
    private router: Router,
    private accountService: AccountService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initAuthForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      fName: [null, [Validators.required]],
      lName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      
    })
  }

  loginUser(): void{
    const { email, password } = this.authForm.value;
    this.log(email, password).then(() => {
      console.log('login done');
    }).catch(e => {
      console.log('login error');
      
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
    const{ email, password } = this.authForm.value;
    this.emailSignUp(email, password).then(() => {
      console.log('sing up done');
      this.authForm.reset();
      
    }).catch(e => {
      console.log('sing up error', e);
      
    })
  }

  async emailSignUp(email:string, password:string): Promise<any>{
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    console.log(credential);
    const user = {
      email: credential.user.email,
      firstName: this.authForm.value.fName,
      lastName: this.authForm.value.lName,
      phoneNumber: this.authForm.value.phoneNumber,
      address: '',
      orders: [],
      role: 'USER'
    };
    
    setDoc(doc(this.afs, 'users', credential.user.uid), user);
  }


  changeIsLogin(){
    this.isLogin = !this.isLogin
  }

}
