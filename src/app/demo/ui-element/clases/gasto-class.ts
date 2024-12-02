import { Data } from "@angular/router";
import { UsuarioClass } from "./usuario-class";

export class GastoClass {
    id?: number; // ID único del gasto
    nombre?: String; 
    descripcion?: String; 
    cantidad?: number; 
    codigo?: string; // Código de la sucursal
    

    usuarioCreacion?: UsuarioClass;
    usuarioModificacion?: UsuarioClass;
    fechaCreacion?: Data;
    fechaModificacion?: Data;
    estado?: String;
    
    constructor(init?: Partial<GastoClass>) {
        Object.assign(this, init); // Permite inicializar propiedades parcialmente
    }
}
