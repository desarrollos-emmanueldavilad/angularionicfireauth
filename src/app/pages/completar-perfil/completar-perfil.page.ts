import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { CompletarPerfilService } from 'src/app/services/completar-perfil.service';


@Component({
  selector: 'app-completar-perfil',
  templateUrl: './completar-perfil.page.html',
  styleUrls: ['./completar-perfil.page.scss'],
})
export class CompletarPerfilPage implements OnInit {
  foto: any;
  cliente_form: FormGroup;
  file: any;
  validations_form: FormGroup;

  constructor(private clienteService: CompletarPerfilService,
    private router: Router,
    private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.resetFields();
  }

  resetFields(){
    this.foto = '';
    this.validations_form = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
       apellido: new FormControl('', Validators.required),
       telefono: new FormControl('', Validators.required),
       foto: new FormControl(this.foto, ),
       direccion: new FormControl('', Validators.required),
       codigoPostal: new FormControl('', Validators.required),
       roles: new FormControl('cliente', ),
    })
  }

  onSubmit(value){
    const data ={
      nombre:value.nombre,
      apellido:value.apellido,
      telefono:value.telefono,
      foto:this.foto,
      direccion:value.direccion,
      codigoPostal:value.codigoPostal,
      roles: value.roles,
    }
    this.clienteService.createCliente(data);

   
  }

  onFotoChanged(e){
    this.file = e.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (event) => {
      this.foto = (<FileReader>event.target).result;
    }
  }

}
