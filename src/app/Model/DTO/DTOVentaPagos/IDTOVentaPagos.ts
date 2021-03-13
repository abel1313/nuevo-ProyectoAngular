import { ICliente } from "../../Clientes/ICliente";



export interface IDTOVentaPagos
{
    idVenta: number;
	totalPagosVenta: number;
	totalVenta: number;
	totalResta: number;
	fechaVenta: string;
	cliente: ICliente;
	usuario?: null;
}