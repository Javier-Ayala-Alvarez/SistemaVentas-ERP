import { FormaPagoClass } from "./forma-pago-class";
import { OperacionClass } from "./operaciones-class";

export class FormaPagoOperacion {
    id?: number = 0; 
    operaciones?: OperacionClass = new OperacionClass() ;
    formasPago?: FormaPagoClass = new FormaPagoClass() ;
    total?: number ;
    }