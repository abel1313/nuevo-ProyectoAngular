import { ICliente } from "../Clientes/ICliente";
import { Detalle } from "../DetalleVenta/Detalle";


import { IPedido } from "../Pedidos/IPedido";
import { Usuario } from "../Usuarios/Usuario";



export interface IRealizarVenta
{
    id?:number;
	totalVenta: number;
	fechaVenta: string;
	 cliente?: ICliente;
	 usuario?: Usuario;
	 
}