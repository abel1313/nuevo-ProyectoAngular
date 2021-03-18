import { IProductoAll } from "./IProductoAll";



export class ProductoAll
{
    producto: IProductoAll =
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
            nombreProveedor: '' ,
            listamarcas: 
            [
                {
                    id: 0,
                    nombre_Marca: ''
                }
            ]
         },

    }
}