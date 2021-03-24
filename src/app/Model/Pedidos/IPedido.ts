import { IDireccion } from "../Direccion/IDireccion";
import { IVenta } from "../Venta/IVenta";



export interface IPedido
{
    id?: number;
    venta?: IVenta;
    direccion: IDireccion;
    
}