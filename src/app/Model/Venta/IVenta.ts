

import { ICliente } from "../Clientes/ICliente";
import { Usuario } from "../Usuarios/Usuario";

export interface IVenta
{
    
        id?: number;
        totalVenta?: number;
        fechaVenta?: string;
        cliente?: ICliente;
        usuario?: Usuario;
      
}