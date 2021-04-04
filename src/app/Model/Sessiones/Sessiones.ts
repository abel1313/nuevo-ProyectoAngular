
import { Router } from "@angular/router";

export class Sessiones 
{
    constructor( private router: Router ) { }

    sessionEditarUsuario( path: string ) {

        if (sessionStorage.getItem("sessionEditProd") == null) 
        {
            this.router.navigateByUrl( path );
        }
    }
     sesionUsuario( path: string )
    {
        if( sessionStorage.getItem("sessionUsuario") == null )
        {
            this.router.navigateByUrl( path );
         
        }
    }
    
    eliminarSession( nombreSesion: string ) {

        if ( sessionStorage.getItem( nombreSesion ) != null) 
        {
            sessionStorage.removeItem( nombreSesion );
        }
    }
    static eliminarSessionesReportes( nombreSesion: string ) {

        if ( sessionStorage.getItem( nombreSesion ) != null) 
        {
            sessionStorage.removeItem( nombreSesion );
        }
    }
}