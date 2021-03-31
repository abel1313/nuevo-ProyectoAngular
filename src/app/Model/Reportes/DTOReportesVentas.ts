import { IDTOReportesVentas } from "./IDTOReportesVentas";



export class DTOReportesVentas
{
    private fechaInicio: string ;
    private fechaFin: string ;

    constructor()
    {
    }
    reporteVentas: IDTOReportesVentas =
    {
        fechaFin: '',
        fechaInicio: ''
    }

    static regresarFecha = ( inicio: string, fin: string)=> 
    {
        return inicio + "" + fin;
    }
}