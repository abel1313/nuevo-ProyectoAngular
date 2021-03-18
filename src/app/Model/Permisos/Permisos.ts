import { IPermisos } from "./IPermisos";



export class Permisos
{
    permisos: IPermisos = 
    {
        usuario:
        {
            id: 0,
            nombre_Usuario: '',
            contra_Usuario: ''
        },
        menu:
            {
                id: 0,
                nombreMenu: '',
                estatusMenu: ''
            }
        
    }

}