import { Data } from "@angular/router";
import { UsuarioClass } from "./usuario-class";

export class CajaClass {
    id?: number; 
    codigo?: number;
    sucursal?: string;
    fechaInicio?: string | Date;
    horaInicio?: string;
    fechaCierre?: string | Date;
    horaCierre?: string;
    efectivoApertura?: number; 
    efectivoCierre?: number;
    estado?:string;



    usuarioCreacion?: UsuarioClass;
    usuarioModificacion?: UsuarioClass;
    fechaCreacion?: Data;
    fechaModificacion?: Data;

    constructor(init?: Partial<CajaClass>) {
        Object.assign(this, init); // Permite inicializar propiedades parcialmente
    }
}
