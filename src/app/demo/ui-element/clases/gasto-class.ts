import { Data } from "@angular/router";
import { UsuarioClass } from "./usuario-class";
import { SucursalClass } from "./sucursal-class";
import { CajaClass } from "./caja-class";

export class GastoClass {
    id?: number; // ID único del gasto
    nombre?: String; 
    descripcion?: String; 
    cantidad?: number; 
    total?: number;
    codigo?: string; // Código de la sucursal
    sucursal?: SucursalClass = new SucursalClass();
    caja?: CajaClass = new CajaClass();

    usuarioCreacion?: UsuarioClass;
    usuarioModificacion?: UsuarioClass;
    fechaCreacion?: Data;
    fechaModificacion?: Data;
    estado?: String;
    
    constructor(init?: Partial<GastoClass>) {
        Object.assign(this, init); // Permite inicializar propiedades parcialmente
    }
}
