export class EstadoClass {
    id? : number;
    nombre?: string;
    
    constructor(init?: Partial<EstadoClass>){
        Object.assign(this, init);
    }
}
