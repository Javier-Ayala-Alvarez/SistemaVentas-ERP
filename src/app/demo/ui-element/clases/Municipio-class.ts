import { DepartamentoClass } from "./Departamento-class";

export class MunicipioClass {
    id?: number = 0;
    nombre?: string;
    select?: boolean = false;

    departamento?: DepartamentoClass = new DepartamentoClass();
}