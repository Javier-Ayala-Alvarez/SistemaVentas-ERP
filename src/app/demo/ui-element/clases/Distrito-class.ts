import { MunicipioClass } from "./Municipio-class";

export class DistritoClass {
    id?: number = 0;
    nombre?: string;
    select?: boolean = false;

    municipio?: MunicipioClass = new MunicipioClass();
}