import { ProductoServer } from "../Productos/ProductoServer";
import { IDetalle } from "./IDetalle";
import { IProducto } from "../Productos/IProducto";
import { IDet } from "./IDet";

export class DetalleVentaServer
{
    detalleVentaServer = {};
    prod = new ProductoServer();
 
    detalleV: IDetalle =
    {
        detalle:
        [
          {
            id: 0,
            precioDetalleVenta: 0,
            cantidadDetalleVenta: 0,
            subtotalDetalleVenta: 0,
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
                nombreProveedor: '',
               },
            },
            venta: 
            {
              id: 0,
              totalVenta: 0,
              fechaVenta: '',
              cliente: 
              {
                id: 0,
                persona: 
                {
                  id: 0,
                  nombrePersona: '',
                  telefonoPersona: '',
                  maternoPersona: '',
                  paternoPersona: '',
                },
              },
  
              usuario: 
              {
                id: 0,
                nombre_Usuario: '',
                contra_Usuario: '',
              },
            }
          }
        ]
    }

    detalleAdd: IDet = 
    {
      id: 0,
      precioDetalleVenta: 0,
      cantidadDetalleVenta: 0,
      subtotalDetalleVenta: 0,
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
              nombreProveedor: '',
           },
  
      },
      venta:
      {
        id: 0,
        totalVenta: 0,
        fechaVenta: '',
        cliente: 
        {
          id: 0,
          persona: 
          {
            id: 0,
            nombrePersona: '',
            telefonoPersona: '',
            maternoPersona: '',
            paternoPersona: '',
          },
        },
        usuario: 
        {
          id: 0,
          contra_Usuario: '',
          nombre_Usuario: '',
        }
      
      }

    }
}