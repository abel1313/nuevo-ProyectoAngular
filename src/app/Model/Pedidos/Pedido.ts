import { IPedido } from "./IPedido";


export class Pedido
{

    pedido: IPedido =
    {
        id: 0,
        direccion: 
        {
            id: 0,
            municipioDireccion: '',
            caracteristicasDireccion: '',
            descripccionDireccion: ''
        }
    }
}