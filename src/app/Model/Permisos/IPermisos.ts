import { IMenu } from "../Menu/IMenu";
import { Usuario } from "../Usuarios/Usuario";


export interface IPermisos
{
    usuario: Usuario;
    menu: IMenu;
}