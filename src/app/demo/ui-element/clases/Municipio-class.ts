import { DepartamentoClass } from "./Departamento-class";

export class MunicipioClass {
    id?: number = 0;
    nombre?: string;
    departamento?: DepartamentoClass = new DepartamentoClass();
}