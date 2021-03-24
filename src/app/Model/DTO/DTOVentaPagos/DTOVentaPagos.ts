import { IDTOVentaPagos } from "./IDTOVentaPagos";


export class DTOVentaPagos
{

    ventasPagos: IDTOVentaPagos = 
    {
        idVenta: 0,
        totalPagosVenta: 0,
        totalVenta: 0,
        totalResta: 0,
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
                paternoPersona: ''
            }
        },
        
    }

}