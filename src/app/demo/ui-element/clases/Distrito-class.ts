import { MunicipioClass } from "./Municipio-class";

export class DistritoClass {
    id?: number = 0;
    nombre?: string;
    municipio?: MunicipioClass = new MunicipioClass();
}