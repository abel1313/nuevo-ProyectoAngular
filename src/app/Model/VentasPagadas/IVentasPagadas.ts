import { IEstatusVenta } from "../EstatusVenta/IEstatusVenta";
import { IVenta } from "../Venta/IVenta";



export interface IVentasPagadas
{

    estatusVenta: IEstatusVenta;
    venta: IVenta;
}