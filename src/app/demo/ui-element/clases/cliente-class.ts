import { Data } from "@angular/router";
import { EstadoClass } from "./estado-class";
import { UsuarioClass } from "./usuario-class";

export class ClienteClass {
    id? : number;
    nombre?: string;
    apellido?:string;
    direccion?: string;
    telefono?: string;
    correo?: string;
    dui?:string;
    nit?: string;
    estado?: EstadoClass;

    usuarioCreacion?: UsuarioClass;
    usuarioModificacion?: UsuarioClass;
    fechaCreacion?: Data;
    fechaModificacion?: Data;
    
    constructor(init?: Partial<ClienteClass>){
        Object.assign(this, init);
    }
}
