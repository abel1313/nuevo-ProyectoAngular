import { Usuario } from "./Usuario";


export class UsuAcc
{
    private id: number;
    private nombre_Usuario: string;
    private contra_Usuario: string;

    constructor( usuario: Usuario )
    {
        this.id = usuario.id;
        
    }


    public getId()
    {
        return this.id;
    }

    public toString = () : string => {
        return `Foo (id: ${this.nombre_Usuario})`;
    }

}