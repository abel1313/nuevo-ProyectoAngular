import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DTOPermisosUsuario } from 'src/app/Model/DTO/DTOPermisosUsuario/DTOPermisosUsuario';
import { Usuario } from 'src/app/Model/Usuarios/Usuario';
import { UsuarioAcceso } from 'src/app/Model/Usuarios/UsuarioAcceso';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-acceder-usuario',
  templateUrl: './acceder-usuario.component.html',
  styleUrls: ['./acceder-usuario.component.css']
})
export class AccederUsuarioComponent implements OnInit {


  constructor( private serviceFerreteria: ServiceFerreteriaService, 
    private _ngZone: NgZone, private router: Router ) { }


  mensajeErrorAcceso: Boolean = false;
  mensajeSpinner: Boolean = false;


  usuarioAcceder = new UsuarioAcceso();

  usuario$: Observable<Usuario[]>;

  subscription: Subscription;

  datosUsuarioAccesso = new DTOPermisosUsuario();

  datAccesoUsr: any;

  ngOnInit(): void 
  {

  }

  accederSistema()
  {
    if( this.usuarioAcceder.usuarioAcceso.nombre_Usuario == ''
      || this.usuarioAcceder.usuarioAcceso.contra_Usuario == '')
    {
      this.validarFormulario();
    }else  
    if( this.usuarioAcceder.usuarioAcceso.nombre_Usuario != ''
    && this.usuarioAcceder.usuarioAcceso.contra_Usuario != '')
    {
      this.buscarUsuarioServidor();
    }
    
  }

  irRegistrar()
  {
   
    this.serviceFerreteria.serviceUsuario.irRegistrar$.emit(true);
  }



  buscarUsuarioServidor()
  {
    this._ngZone.runOutsideAngular(()=>
    {
      this.subscription = this.serviceFerreteria.serviceUsuario
      .accesoSistema(this.usuarioAcceder.usuarioAcceso)
      .subscribe
      (
        res=>
        {
          this._ngZone.run(()=>
          {
            this.datAccesoUsr = res;
          
          
            if( this.datAccesoUsr.usuario == null )
            {
          
            
              this.mensajeSpinner = true;

              setTimeout(() => {
                this.mensajeErrorAcceso = true;
                this.mensajeSpinner = false;
              }, 2000);
  
              setTimeout(() => {
                this.mensajeErrorAcceso = false;
            }, 3000);
  
  
            }else{
              sessionStorage.setItem("sessionUsuario", JSON.stringify(this.datAccesoUsr) );
              this.router.navigateByUrl('/mostrarProducto');

              console.log(this.datAccesoUsr);
              this.serviceFerreteria.serviceUsuario.permisosUsuarios$.emit(
                ( this.datAccesoUsr.listaPermiso != null || 
                  this.datAccesoUsr.listaPermiso.includes(4) ) ? true  : false);
             
                  this.serviceFerreteria.serviceUsuario.permisosClientes$.emit(
                ( this.datAccesoUsr.listaPermiso != null || 
                  this.datAccesoUsr.listaPermiso.includes(1) ) ? true  : false);
             
                  this.serviceFerreteria.serviceUsuario.permisosProductos$.emit(
                ( this.datAccesoUsr.listaPermiso != null || 
                  this.datAccesoUsr.listaPermiso.includes(2) ) ? true  : false);
             
                  this.serviceFerreteria.serviceUsuario.permisosVentas$.emit(
                ( this.datAccesoUsr.listaPermiso != null || 
                  this.datAccesoUsr.listaPermiso.includes(3) ) ? true  : false);
                  
                 this.serviceFerreteria.serviceUsuario.nombreUsuario$.emit
                 (
                  (
                    this.datAccesoUsr.usuario.nombre_Usuario != null  || 
                    this.datAccesoUsr.usuario.nombre_Usuario != ""
                  ) ? this.datAccesoUsr.usuario.nombre_Usuario : ""
                 );

                 console.log(this.datAccesoUsr.usuario.nombre_Usuario, " acceder");
                 
            }
          });
        }, 
        err=>
        {
          if(err != null)
          {
            console.log(" errorsisimo");
          }
        }
      );
    });
  }

  validarFormulario()
  {
    // Example starter JavaScript for disabling form submissions if there are invalid fields

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form: any) {
      form.addEventListener('submit', function (event: any) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
     
        }
        form.classList.add('was-validated')
      }, false)
    });
  
  }

  ngOnDestroy(): void {
  
  }


}