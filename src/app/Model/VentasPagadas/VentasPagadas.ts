import { IVentasPagadas } from "./IVentasPagadas";



export class VentasPagadas
{
    ventasPagadas: IVentasPagadas =
    {
        estatusVenta: {
            id: 0,
            nombreEstatus: ""
          },
          venta: {
            id: 0,
            totalVenta: 0,
            fechaVenta: ""
    }
  }
}