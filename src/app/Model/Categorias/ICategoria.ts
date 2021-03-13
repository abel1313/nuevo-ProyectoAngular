import { IEstatusCategoria } from "../EstatusCategoria/IEstatusCategorias";




export interface ICategoria
{
    id?: number;
    nombreCategoria: string;
    estatusCategoria: IEstatusCategoria;
}