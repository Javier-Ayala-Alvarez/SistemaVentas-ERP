import { Data } from "@angular/router";
import { CategoriaClass } from "./categoria-class";
import { EstadoClass } from "./estado-class";
import { UnidadMedidaClass } from "./unidad-medida-class";
import { UsuarioClass } from "./usuario-class";

export class ProductoClass {
    id? : number;
    codigo? : number; 
    nombre?: string;
    descripcion?:string;
    estado?: String;
    categoria?: CategoriaClass;
    nombreImagen?: string;
    unidadMedida?: UnidadMedidaClass[] ;

    usuarioCreacion?: UsuarioClass;
    usuarioModificacion?: UsuarioClass;
    fechaCreacion?: Data;
    fechaModificacion?: Data;
    
    constructor(init?: Partial<ProductoClass>){
        Object.assign(this, init);
    }
}
