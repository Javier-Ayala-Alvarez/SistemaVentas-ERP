import { Data } from "@angular/router";
import { UsuarioClass } from "./usuario-class";

export class CompraClass {
    usuarioCreacion?: UsuarioClass;
    usuarioModificacion?: UsuarioClass;
    fechaCreacion?: Data;
    fechaModificacion?: Data;
}
