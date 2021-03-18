import { IMarca } from "../Marcas/IMarca";


export interface IProveedorAll
{

    id?: number;
    nombreProveedor: string ;
    listamarcas: [IMarca]

   

}