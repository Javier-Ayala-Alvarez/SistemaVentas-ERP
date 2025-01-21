import { Data } from "@angular/router";
import { UsuarioClass } from "./usuario-class";

export class EmpresaClass {
    id? : number;
    nombre?: string;
    direccion?: string;
    telefono?: string;
    correo?: string;
    nit?:string;
    fecha?: string ; // Permite manejar fechas como string o Date
    direccionLogo?:string;

//usuarioCreacion?: UsuarioClass;
    //usuarioModificacion?: UsuarioClass;
    fechaCreacion?: Data;
    fechaModificacion?: Data;
    
    constructor(init?: Partial<EmpresaClass>){
        Object.assign(this, init);
    }
}
