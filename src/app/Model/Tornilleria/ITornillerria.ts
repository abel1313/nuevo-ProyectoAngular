import { ICategoria } from "../Categorias/ICategoria";
import { IProducto } from "../Productos/IProducto";



export interface ITornilleria
{
    id?: number;
    categoria: ICategoria;
    producto: IProducto;
}