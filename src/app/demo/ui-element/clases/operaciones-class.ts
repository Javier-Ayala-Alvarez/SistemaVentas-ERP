import { Data } from "@angular/router";
import { UsuarioClass } from "./usuario-class";
import { SucursalClass } from "./sucursal-class";
import { isNull } from "lodash";
import { ClienteClass } from "./cliente-class";
import { ProveedorClass } from "./proveedor-class";
import { DepartamentoClass } from "./Departamento-class";
import { MunicipioClass } from "./Municipio-class";
import { DistritoClass } from "./Distrito-class";
import { TipoOperacionClass } from "./tipo-operacion-class";
import { CajaClass } from "./caja-class";

export class OperacionClass {
    id?: number = 0; 
    cliente?: ClienteClass = new ClienteClass();
    vendedor?: UsuarioClass  = new UsuarioClass();
    proveedor?: ProveedorClass = new ProveedorClass();
    descripcion?: String;
    nFactura?: string;
    departamento?: DepartamentoClass= new DepartamentoClass();
    municipio?: MunicipioClass= new MunicipioClass();
    sucursal?: SucursalClass = new SucursalClass();
    distrito?: DistritoClass= new DistritoClass();
    fechaElaboracion?: string;
    fechaVencimiento?: string | Date | undefined;

    dui?: String;
    nit?: String;
    caja?: CajaClass = new CajaClass(); 
    tipoOperacion?: TipoOperacionClass= new TipoOperacionClass();
    subTotal?: number= 0; 
    iva?: number = 0;
    porcentajeIva?: number = 0; 
    retencion?: number = 0;
    total?: number = 0; 
    estado?: String;

   // usuarioCreacion?: UsuarioClass;
    //usuarioModificacion?: UsuarioClass;
    //fechaCreacion?: Data;
    //fechaModificacion?: Data;

    constructor(init?: Partial<OperacionClass>) {
        Object.assign(this, init); // Permite inicializar propiedades parcialmente

    }
}