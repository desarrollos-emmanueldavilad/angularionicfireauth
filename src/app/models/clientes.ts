export interface Roles {
    cliente?: boolean;
    admin?: boolean;
  }
  
  export interface UserInterface {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    photoUrl?: string;
    roles: Roles;
  }

  export interface Cliente {
    userId?: string;
    nombre?: string;
    apellido?: string;
    telefono?: string;
    foto?: string;
    createAt?: string;
    direccion?:string;
    codigoPostal?:string;
    roles: Roles;
  }