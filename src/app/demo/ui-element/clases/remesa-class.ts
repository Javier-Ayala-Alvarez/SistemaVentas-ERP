import { Data } from "@angular/router";
import { UsuarioClass } from "./usuario-class";
import { SucursalClass } from "./sucursal-class";
import { EstadoClass } from "./estado-class";

export class RemesaClass {

    id? : number;
    codigo?: number;
    numCaja?: number;
    cantidad?:string;
    sucursal?: SucursalClass= new SucursalClass();
    estado?: String;

    usuarioCreacion?: UsuarioClass;
    usuarioModificacion?: UsuarioClass;
    fechaCreacion?: Data;
    fechaModificacion?: Data;
    
    constructor(init?: Partial<RemesaClass>){
        Object.assign(this, init);
    }
}
