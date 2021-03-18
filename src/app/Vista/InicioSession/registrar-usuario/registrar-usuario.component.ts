import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Usuario } from 'src/app/Model/Usuarios/Usuario';
import { UsuarioAcceso } from 'src/app/Model/Usuarios/UsuarioAcceso';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit, OnDestroy {

  constructor( private serviceFerreteria: ServiceFerreteriaService,
               private router: Router, private _ngZone: NgZone ) { }


  usuarioAcceder = new UsuarioAcceso();

  usuarios$: Observable<Usuario>;

  repetirContr: string;

  subscription: Subscription;

  mensajeSpinner: Boolean = false;
  mensajeErrorAcceso: Boolean = false;
  
  mensajeErrorContr: Boolean = false;
  mensajeDatosError: Boolean = false;

  mensajeRegistro: Boolean = false;

  cajasInput: Boolean = false;

  existsMensaje: Boolean = false;

  existeUsuario: boolean = false;

  aver$: Observable<Boolean>;

  usuarioExistente : Boolean = false;


  ngOnInit(): void 
  {

    
  }

  updateBlur()
  {
    if( this.usuarioAcceder.usuarioAcceso.nombre_Usuario != '' )
    {
      
      this._ngZone.runOutsideAngular(()=>
      {

        this.subscription = this.serviceFerreteria.serviceUsuario
        .existsUsuario(this.usuarioAcceder.usuarioAcceso.nombre_Usuario)
        .subscribe
        (
          res =>
          { 
           
            this._ngZone.run(()=>
            {
              this.existeUsuario = Boolean(res);
              
              this.usuarioExistente = this.existeUsuario;
            
              setTimeout(() => {
                this.existeUsuario = this.existeUsuario == true ? false : false;
              }, 1500);

            });
          }, err=>console.log(err)
        );

      });

    }else
    {
      
    }
  }

  registrarUsuario()
  {
  
    if(  this.usuarioExistente )
    {
      this.existeUsuario = true ;

      
      setTimeout(() => {
        this.existeUsuario = false;
      }, 1500); 
    }else
    {
      if(this.usuarioAcceder.usuarioAcceso.contra_Usuario != '' &&
      this.usuarioAcceder.usuarioAcceso.nombre_Usuario != '' &&
      this.repetirContr != '' )
      {
        if( this.usuarioAcceder.usuarioAcceso.contra_Usuario == this.repetirContr )
        {
          this.mensajeSpinner = true;
          this.cajasInput = true;
           this.registrarUsuarioServer();
          
        }else
        {
          this.mensajeErrorContr = true;
          setTimeout(() => {
            this.mensajeErrorContr = false;
          }, 2500);
        }
      }else
      {
        
        this.mensajeDatosError = true;
        setTimeout(() => {
          this.mensajeDatosError = false;
        }, 2500);
      }
    }


    
  }

  irAcceso()
  {
    this.serviceFerreteria.serviceUsuario.irRegistrar$.emit(false);
  }

  registrarUsuarioServer()
  {
    
    setTimeout(() => {
      
      this._ngZone.runOutsideAngular(() =>
      { 
        this.subscription = this.serviceFerreteria.serviceUsuario
        .guardarUsuarioServer(this.usuarioAcceder.usuarioAcceso)
        .subscribe
        (
          res=>
          {
            this._ngZone.run(()=>
            {
              this.usuarioAcceder.usuarioAcceso.nombre_Usuario = '';
              this.usuarioAcceder.usuarioAcceso.contra_Usuario = '';
              this.repetirContr = '';
              this.mensajeSpinner = false;
              this.cajasInput = false;
              
              this.mensajeRegistro = true;

              setTimeout(() => {
                this.mensajeRegistro = false;
                this.serviceFerreteria.serviceUsuario.irRegistrar$.emit(false);
              }, 2000);

              console.log(res);
            });
          }, err=> console.log(err)
        );
      });

    }, 3000 );

  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
