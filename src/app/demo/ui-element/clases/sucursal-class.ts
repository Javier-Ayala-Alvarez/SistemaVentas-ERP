import { DatePipe } from '@angular/common';
import { EmpresaClass } from "./empresa-class";
import { UsuarioClass } from "./usuario-class";

export class SucursalClass {
    id?: number = 0; // ID único de la sucursal
    codigo?: string; // Código de la sucursal
    nombre?: string = ""; // Nombre de la sucursal
    direccion?: string; // Dirección de la sucursal
    telefono?: string; // Teléfono de contacto
    correo?: string; // Correo electrónico de contacto
    fecha?: string | Date; // Permite manejar fechas como string o Date
    estado?: string;
    empresa?: EmpresaClass = new EmpresaClass(); // Empresa asociada a la sucursal
    fechaCreacion?: Date; // Fecha de creación del registro
    fechaModificacion?: Date; // Fecha de última modificación

    constructor(init?: Partial<SucursalClass>) {
        Object.assign(this, init); // Permite inicializar propiedades parcialmente
    }
}
