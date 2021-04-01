import { IVenta } from "../../Venta/IVenta";
import { IDTOVentaPago } from "./IDTOVentaPago";



export interface IDTOPagosServer
{
    venta: IVenta;
	listaPagos: [IDTOVentaPago];
}