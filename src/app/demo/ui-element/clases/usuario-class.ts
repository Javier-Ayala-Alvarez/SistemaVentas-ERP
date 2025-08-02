import { Data } from "@angular/router";

export class UsuarioClass {
    id?: Number;
    nombre?: String;
    username?: String;
    descripcion?: String;
    usuarioCreacion?: UsuarioClass;
    usuarioModificacion?: UsuarioClass;
    fechaCreacion?: Data;
    fechaModificacion?: Data;
}
