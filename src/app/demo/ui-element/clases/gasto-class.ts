import { Data } from "@angular/router";
import { UsuarioClass } from "./usuario-class";

export class GastoClass {
    usuarioCreacion?: UsuarioClass;
    usuarioModificacion?: UsuarioClass;
    fechaCreacion?: Data;
    fechaModificacion?: Data;
}
