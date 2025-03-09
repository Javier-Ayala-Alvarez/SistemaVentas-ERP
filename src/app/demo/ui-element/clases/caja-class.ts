import { Data } from "@angular/router";
import { UsuarioClass } from "./usuario-class";
import { SucursalClass } from "./sucursal-class";
import { isNull } from "lodash";

export class CajaClass {
    id?: number = 0; 
    codigo?: number;
    sucursal?: SucursalClass = new SucursalClass();
    fechaInicio?: string | Date;
    horaInicio?: string;
    fechaCierre?: string | Date;
    horaCierre?: string;
    efectivoApertura?: number; 
    efectivoCierre?: number ;
    estado?:string;



    usuarioCreacion?: UsuarioClass;
    usuarioModificacion?: UsuarioClass;
    fechaCreacion?: Data;
    fechaModificacion?: Data;

    constructor(init?: Partial<CajaClass>) {
        Object.assign(this, init); // Permite inicializar propiedades parcialmente

    }
}
