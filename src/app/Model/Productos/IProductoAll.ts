import { IProveedorAll } from "../Proveedores/IProveedorAll";


export interface IProductoAll // extends IProveedor
{
    id?: number,
    nombreProducto: string;
    codigoBarrasProducto: string;
    descripcionProducto: string;
    caracteristicasProducto: string;
    existenciaProducto: number;
    precioProducto: number;

     proveedor: IProveedorAll;

    
}