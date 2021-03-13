

import { IProveedor  } from "../Proveedores/IProveedor";

export interface IProducto // extends IProveedor
{
    id?: number,
    nombreProducto: string;
    codigoBarrasProducto: string;
    descripcionProducto: string;
    caracteristicasProducto: string;
    existenciaProducto: number;
    precioProducto: number;

     proveedor: IProveedor;
    
}
