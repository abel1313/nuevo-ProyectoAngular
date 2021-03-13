import { IVenta } from "../Venta/IVenta"




export interface IPagosVenta 
{
    id?: number;
    pagoVenta: number;
    fechaPago: string;
    venta?: IVenta;

}
