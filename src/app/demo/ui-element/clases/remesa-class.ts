import { Data } from "@angular/router";
import { UsuarioClass } from "./usuario-class";
import { SucursalClass } from "./sucursal-class";
import { EstadoClass } from "./estado-class";

export class RemesaClass {

    id? : number;
    numeroCaja?: string;
    cantidad?:string;
    sucursal?: SucursalClass;
    estado?: EstadoClass;

    usuarioCreacion?: UsuarioClass;
    usuarioModificacion?: UsuarioClass;
    fechaCreacion?: Data;
    fechaModificacion?: Data;
    
    constructor(init?: Partial<RemesaClass>){
        Object.assign(this, init);
    }
}
