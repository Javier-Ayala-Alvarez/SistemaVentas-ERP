import { Data } from "@angular/router";
import { EstadoClass } from "./estado-class";
import { UsuarioClass } from "./usuario-class";

export class ProveedorClass {
    id? : number;
    codigo?: number;
    nombre?: string;
    apellido?:string;
    direccion?: string;
    telefono?: string;
    correo?: string;
    fecha?: string;
    dui?:string;
    nit?: string;
    estado?: String;

    usuarioCreacion?: UsuarioClass;
    usuarioModificacion?: UsuarioClass;
    fechaCreacion?: Data;
    fechaModificacion?: Data;
    
    constructor(init?: Partial<ProveedorClass>){
        Object.assign(this, init);
    }
}
