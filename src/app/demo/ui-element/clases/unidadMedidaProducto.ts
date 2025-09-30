import { Data } from "@angular/router";
import { ProductoClass } from "./producto-class";
import { UsuarioClass } from "./usuario-class";
import { UnidadMedidaClass } from "./unidad-medida-class";

export class UnidadMedidaProductoClass {
    id? : number;
    producto?: ProductoClass = new ProductoClass();
    unidadMedida?:UnidadMedidaClass = new UnidadMedidaClass();
    precio?: number;
    precioCompra?: number;//agrego precio compra
    usuarioCreacion?: UsuarioClass;
    usuarioModificacion?: UsuarioClass;
    fechaCreacion?: Data;
    fechaModificacion?: Data;

    
    constructor(init?: Partial<UnidadMedidaClass>){
        Object.assign(this, init);
    }
}
