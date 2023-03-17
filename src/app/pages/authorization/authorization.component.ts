import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { setDoc } from '@firebase/firestore';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constants/roles.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit, OnDestroy {


  public authForm!: FormGroup;
  public loginSubscription!: Subscription

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private auth: Auth,
    private afs: Firestore
  ) { }

  ngOnInit(): void {
    this.initAuthForm()
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe()
  }
  
  initAuthForm():void{
    this.authForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }
  login():void{
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
  this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
    
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


}
