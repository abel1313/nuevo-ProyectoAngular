
import { Router } from "@angular/router";

export class Sessiones 
{
    private sesionesEliminar: string [] = 
    [      
     
      'editarMarca',
      'datosEditarProducto',
      'datosClientes',
      'ediatrCliente',
      'reportePagoCliente',
      'sesionPagos',
      'generarReportePagos',
      'iReportePago',
      'sessionEditProd',
      'datosEditarProd',
      'reporteVenta'
    ];
    constructor( private router: Router ) { }

     getSesionesEliminar()
    {
        return this.sesionesEliminar;
    }

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


    static eliminarSesiones( sesion: Array<string> )
    {
        
        sesion.forEach(element => {
            if( sessionStorage.getItem(element) != null )
            {
                sessionStorage.removeItem(element);
            }
        });

    }
    eliminarSessionesEditar(  sesionEditar: Array<string>)
    {
        sesionEditar.forEach(element => {
            if( sessionStorage.getItem(element) != null )
            {
                sessionStorage.removeItem(element);
            }
        });
    }


     interfazEditar( uri: string, path: string )
    { 
       if( sessionStorage.getItem( uri ) == null  )
        {
          this.eliminarSessionesEditar( this.sesionesEliminar ); 
          this.router.navigateByUrl( path );
        }
      
    }
    direfenteInterfazEditar(  )
    {
          this.eliminarSessionesEditar( this.sesionesEliminar ); 
          
    }


}