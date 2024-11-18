import { Data } from "@angular/router";
import { UsuarioClass } from "./usuario-class";

export class VentaClass {

    usuarioCreacion?: UsuarioClass;
    usuarioModificacion?: UsuarioClass;
    fechaCreacion?: Data;
    fechaModificacion?: Data;
}
