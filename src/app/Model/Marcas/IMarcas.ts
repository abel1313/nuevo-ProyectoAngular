import { IProveedor } from "../Proveedores/IProveedor";



export interface IMarcas
{
    id?: number;
    nombreMarca: string;
    proveedores: IProveedor;
}