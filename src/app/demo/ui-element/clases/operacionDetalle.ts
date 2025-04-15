import { OperacionClass } from "./operaciones-class";
import { ProductoClass } from "./producto-class";
import { UnidadMedidaClass } from "./unidad-medida-class";

export class OperacionDetalleClass {
    id?: number = 0; 
    producto?: ProductoClass = new ProductoClass();
    unidadMedida?: UnidadMedidaClass = new UnidadMedidaClass();
    operacion?: OperacionClass = new OperacionClass();
    cantidad?: number;
    descuento?: number;
    total?: number;
    precioUnitario?: number;

    }