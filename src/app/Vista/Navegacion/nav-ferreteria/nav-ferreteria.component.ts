import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-nav-ferreteria',
  templateUrl: './nav-ferreteria.component.html',
  styleUrls: ['./nav-ferreteria.component.css']
})
export class NavFerreteriaComponent implements OnInit {

  constructor( public serviceFerreteria: ServiceFerreteriaService,
              private router: Router, _ngZone: NgZone ) { }

  nombreUsuario: string;

  sessionUsuarioAcceso: any;

 
    permisosVentas: Boolean = false;
    permisosUsuarios: Boolean = false;
   permisosProductos: Boolean = false;
    permisosClientes: Boolean = false;
    nombreUsuarioAcceso: string = "";

    subscription: Subscription;
 
  datosPermisosSesion: any;
  permisoUsuario: Boolean = false;

  per$: Observable<Boolean>;


  ngOnInit(): void 
  {

this.mostrarNavegacion();

this.per$ = this.serviceFerreteria.serviceUsuario.permisosVentas$;
this.per$.subscribe
(
    
      res=>console.log(res, " res 2")
    
  )

  }




mostrarNavegacion()
{
  this.sessionUsuarioAcceso = sessionStorage.getItem("sessionUsuario") != null ?
  JSON.parse( sessionStorage.getItem("sessionUsuario")) : null ;

  if( sessionStorage.getItem("sessionEditProd") != null )
  {
    sessionStorage.removeItem("sessionEditProd")
  } 
  if( this.sessionUsuarioAcceso == null )
  {
    this.router.navigateByUrl("/acceso");
  }else
  if( this.sessionUsuarioAcceso != null )
  {
      console.log(this.sessionUsuarioAcceso.usuario.nombre_Usuario, "Lista");
     this.permisosVentas =
      (this.sessionUsuarioAcceso.listaPermiso.includes(3) &&
      this.sessionUsuarioAcceso.listaPermiso != null ) ? true: false;

      this.permisosClientes =
      (this.sessionUsuarioAcceso.listaPermiso.includes(1) &&
      this.sessionUsuarioAcceso.listaPermiso != null ) ? true: false;

      this.permisosUsuarios =
      (this.sessionUsuarioAcceso.listaPermiso.includes(4) &&
      this.sessionUsuarioAcceso.listaPermiso != null ) ? true: false;

      this.permisosProductos =
      (this.sessionUsuarioAcceso.listaPermiso.includes(2) &&
      this.sessionUsuarioAcceso.listaPermiso != null ) ? true: false;

      this.nombreUsuarioAcceso = 
      (
        this.sessionUsuarioAcceso.usuario.nombre_Usuario != null &&
        this.sessionUsuarioAcceso.usuario.nombre_Usuario != ""
      )? this.sessionUsuarioAcceso.usuario.nombre_Usuario : "" 

      //console.log(this.serviceFerreteria.serviceUsuario.nombreUsuario$ , "test");

     
  }

  this.subscription = this.serviceFerreteria.serviceUsuario.nombreUsuario$
  .subscribe
  (
    res=>
    {
      console.log(res, " res");
      this.nombreUsuarioAcceso = res;
    },
    err=> console.log(err)
  );

}

cerrarSession()
{
  
  if( sessionStorage.getItem("sessionUsuario") != null )
  {
    if( sessionStorage.getItem("carritoventa") != null )
    { 
      sessionStorage.removeItem("carritoventa");
      sessionStorage.removeItem("tamanoCarrito");
      sessionStorage.removeItem("productoDetalle");
    }
    if(  sessionStorage.getItem("ediatrCliente") != null )
    {
      sessionStorage.removeItem("ediatrCliente");
    }
    sessionStorage.removeItem("sessionUsuario");
    sessionStorage.removeItem("datosClientes");
    
    this.router.navigateByUrl('/acceso');
  }
}



}
