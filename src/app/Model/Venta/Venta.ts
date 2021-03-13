
import { Productos } from "../Productos/Producto";
import { IDetalleVenta } from "../DetalleVenta/DetalleVenta";






export interface IVenta 
{
    id?: number;
    totalVenta: number;
// fechaVenta: Date;
    detalle: [IDetalleVenta];
//     {
//         precioDetalleVenta: number;
//         cantidadDetalleVenta: number;
//         subtotalDetalleVenta: number;
        
//         id? : number;
//         venta? :number;
    
//         data: [IProductos];

//         // tamibien podria ir data: Array<IProductos>
         
    

// }
    
}
