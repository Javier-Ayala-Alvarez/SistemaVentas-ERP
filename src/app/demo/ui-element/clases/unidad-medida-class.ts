import { Data } from "@angular/router";
import { EstadoClass } from "./estado-class";
import { UsuarioClass } from "./usuario-class";

export class UnidadMedidaClass {
    id? : number;
    nombre?: string;
    abreviatura?:string;
    descripcion?:string;
    factor?: string;
    estado?: EstadoClass;
    precio?: number;

    usuarioCreacion?: UsuarioClass;
    usuarioModificacion?: UsuarioClass;
    fechaCreacion?: Data;
    fechaModificacion?: Data;

    
    constructor(init?: Partial<UnidadMedidaClass>){
        Object.assign(this, init);
    }
}
