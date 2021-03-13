import { ITornilleria } from "./ITornillerria";


export class Tornilleria
{
    tornilleria: ITornilleria =
    {
        categoria:
        {
            id: 0,
            nombreCategoria: '',
            estatusCategoria: 
            {
                id: 0,
                nombreEstatusCategoria: '',
            },
        },
        producto:
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
}