import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { promise } from 'protractor';
import { UserInterface } from '../models/clientes';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }

  SendVerificationMail(){
    return this.afsAuth.auth.currentUser.sendEmailVerification(),
    this.logoutUser()
    .then(()=>{
      console.log('Deslogeador')
    })
  }

  doRegister(value) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user)
        }).catch(err => console.log(reject(err)))
    });
  }


  loginEmailUser(email:string, pass:string){
    return new Promise((resolve,reject) =>{
      this.afsAuth.auth.signInWithEmailAndPassword(email,pass)
      .then(userData => resolve(userData),
      err=> reject(err));
    });
  }

  loginFacebookUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(credential => this.updateUserData(credential.user))
  }

  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(credential => this.updateUserData(credential.user))
  }

  logoutUser(){
    return this.afsAuth.auth.signOut();
  }

  isAuth(){
    return this.afsAuth.authState.pipe(map(auth=>auth));
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`clientes/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      roles: {
        cliente: true
      }
    }
    return userRef.set(data, {merge: true});
  }

  isUserAdmin(userUid){
    return this.afs.doc<UserInterface>(`clientes/${userUid}`).valueChanges();
  }
}
