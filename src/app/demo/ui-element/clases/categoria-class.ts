import { Data } from "@angular/router";
import { EstadoClass } from "./estado-class";
import { UsuarioClass } from "./usuario-class";

export class CategoriaClass {
    id? : number;
    codigo?: number; 
    nombre?: string ;
    descripcion?:string;
    estado?: String; 
    
    usuarioCreacion?: UsuarioClass;
    usuarioModificacion?: UsuarioClass;
    fechaCreacion?: Data;
    fechaModificacion?: Data;
    
    constructor(init?: Partial<CategoriaClass>){
        Object.assign(this, init);
    }
}
