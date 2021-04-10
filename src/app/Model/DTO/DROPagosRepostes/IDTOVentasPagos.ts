import { ICliente } from "../../Clientes/ICliente";


export interface IDTOVentasPagos
{
     idVenta: number;
	
	totalPagosVenta: number;
	
	 totalVenta: number;
	
	totalResta: number;
	
	 fechaVenta: number;
	
	cliente: ICliente;
	
	usuario: number;
}