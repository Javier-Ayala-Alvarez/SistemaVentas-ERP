import { Data } from "@angular/router";
import { EmpresaClass } from "./empresa-class";
import { UsuarioClass } from "./usuario-class";

export class SucursalClass {
    id? : number;
    nombre?: string;
    direccion?: string;
    telefono?: string;
    correo?: string;
    fecha?:Date;
    empresa?: EmpresaClass;

    usuarioCreacion?: UsuarioClass;
    usuarioModificacion?: UsuarioClass;
    fechaCreacion?: Data;
    fechaModificacion?: Data;
    
    constructor(init?: Partial<SucursalClass>){
        Object.assign(this, init);
    }
}
