import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface, Cliente } from '../models/clientes';
import { resolve } from 'url';
import { reject } from 'q';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompletarPerfilService {

  private snapshotChangesSubscription: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
  ) { }

  getClienteAdmin(){
    return new Promise<Cliente>((resolve,reject)=>{
      this.snapshotChangesSubscription = this.afs.collection('/cliente-perfil').snapshotChanges();
      resolve(this.snapshotChangesSubscription);
    });
  }
  getCliente(){
    return new Promise<Cliente>((resolve,reject)=>{
      this.afAuth.user.subscribe(currentUser =>{
        if(currentUser){
          this.snapshotChangesSubscription = this.afs.collection('perfil-cliente', ref => ref.where('userId', '==', currentUser.uid)).snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }

  getClienteId(clienteId){
    return new Promise<Cliente>((resolve,reject)=>{
      this.snapshotChangesSubscription = this.afs.doc<Cliente>('/perfil-cliente/' + clienteId).valueChanges()
      .subscribe(snapshots =>{
        resolve(snapshots);
      },err =>{
        reject(err);
      });
    })
  }

    unsubscribeOnLogOut() {
      //remember to unsubscribe from the snapshotChanges
      this.snapshotChangesSubscription.unsubscribe();
    }
    updateRegistroCliente(registroClienteKey, value) {
      return new Promise<any>((resolve, reject) => {
        console.log('update-registroClienteKey', registroClienteKey);
        console.log('update-registroClienteKey', value);
        this.afs.collection('perfil-cliente').doc(registroClienteKey).set(value) 
          .then(
            res => resolve(res),
            err => reject(err)
          );
      });
    }

    deleteRegistroCliente(registroClienteKey) {
      return new Promise<any>((resolve, reject) => {
        console.log('delete-registroClienteKey', registroClienteKey);
        this.afs.collection('perfil-cliente').doc(registroClienteKey).delete()
          .then(
            res => resolve(res),
            err => reject(err)
          );
      });
    }

    createCliente(value){
      return new Promise<Cliente>((resolve,reject)=>{
        let currentUser = firebase.auth().currentUser;
        this.afs.collection('perfil-cliente').add({
       userId: currentUser.uid,
       nombre:value.nombre,
       apellido:value.apellido,
       telefono:value.telefono,
       foto:value.foto,
       createAt: Date.now(),
       direccion:value.direccion,
       codigoPostal:value.codigoPostal,
       roles: value.roles,
        }).then(
          resolve =>{
            this.router.navigate(['/inicio']);
          }
        );
      })
    }
  }

