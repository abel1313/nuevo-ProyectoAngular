import { IProducto } from "./IProducto";


export class ProductoServer
{
   
    producto: IProducto = 
    {
        id: 0,
        nombreProducto: '',
        codigoBarrasProducto: '',
        descripcionProducto: '',
        caracteristicasProducto: '',
        existenciaProducto: 0,
        precioProducto: 0,
         proveedor: 
         {
            id: 0,
            nombreProveedor: ''
         }

    }


}