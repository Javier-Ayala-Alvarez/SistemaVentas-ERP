import { Data } from "@angular/router";
import { UsuarioClass } from "./usuario-class";
import { SucursalClass } from "./sucursal-class";
import { ProductoClass } from "./producto-class";
export class KardexClass {
    id?: number; // fila única generada por row_number()
    idProducto?: number;
    nombreProducto?: string;
    tipoOperacion?: number; // 1 = SALIDA, 2 = ENTRADA (opcional)
    operacion?: 'ENTRADA' | 'SALIDA';
    cantidadOriginal?: number;
    unidadOperacion?: string;
    cantidadMinima?: number;
    precioUnitario?: number;
    total?: number;
    stock?: number;
    valorStock?: number;
    fecha?: Date;
    producto?: ProductoClass = new ProductoClass(); 
    sucursal?: SucursalClass = new SucursalClass();
    observaciones?: string; 
    usuarioCreacion?: UsuarioClass;
    usuarioModificacion?: UsuarioClass;
    estado?: string;

    comprobante?: string;
    proveedorCliente?: string;
    lote?: string;


    constructor(init?: Partial<KardexClass>) {
        Object.assign(this, init);
    }
}
