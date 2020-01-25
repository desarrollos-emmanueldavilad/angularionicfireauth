import { Component, OnInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})


export class RegistroPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  image: any;

  validation_messages = {
    'email': [
      {type: 'required', message: 'Correo Electronico es Requerido.'},
      {type: 'pattern', message: 'Inserte un Correo Electronico Real.'}
    ],
    'password': [
      {type: 'required', message: 'Contraseña Requerida.'},
      {type: 'minlength', message: 'La Contraseña debe tener mas de 5 digitos.'}
    ],
    'instagram': [
      {type: 'required', message: 'Confirmar Contraseña Requerida.'},
      {type: 'minlength', message: 'la Contraseña debe ser igual.'},
      ]
  };

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) {
  }

  ngOnInit() {
    this.image = './assets/imgs/restaurante.png';
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  tryRegister(value) {
    this.authService.doRegister(value)
      .then(res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Tu cuenta fue Creada.';
        this.router.navigate(['/completar-perfil']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
}


  

 

  async presentLoading(loading) {
    return await loading.present();
  }

}
