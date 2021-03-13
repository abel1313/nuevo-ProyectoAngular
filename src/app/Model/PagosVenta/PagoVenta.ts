import { IPagosVenta } from "./IPagosVenta"



export class PagoVenta
{
    pago: IPagosVenta =
    {
        id: 0,
        pagoVenta: 0,
        fechaPago: '',
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
                correoelectronicoPersona: '',
                fechanacimientosPersona: '',
                generoPersona: '',
                maternoPersona: '',
                paternoPersona: '',
              },
            },

            usuario: 
            {
              id: 0,
              nombre_Usuario: '',
              contra_Usuario: '',
            }
        }
      }

}