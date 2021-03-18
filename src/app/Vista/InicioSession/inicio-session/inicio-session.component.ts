import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DTOPermisosUsuario } from 'src/app/Model/DTO/DTOPermisosUsuario/DTOPermisosUsuario';
import { Usuario } from 'src/app/Model/Usuarios/Usuario';
import { UsuarioAcceso } from 'src/app/Model/Usuarios/UsuarioAcceso';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-inicio-session',
  templateUrl: './inicio-session.component.html',
  styleUrls: ['./inicio-session.component.css']
})
export class InicioSessionComponent implements OnInit, OnDestroy {

  constructor( private serviceFerreteria: ServiceFerreteriaService,
              private router: Router, private _ngZone: NgZone) { }

  accederRegistrar: Boolean = false;


  ngOnInit(): void 
  {

    this.mostrandoTempate();
  }

 
  mostrandoTempate()
  {  
    this.serviceFerreteria.serviceUsuario.irRegistrar$.subscribe
    (
      res=>
      {
        this.accederRegistrar = res;
        console.log(this.accederRegistrar, "des");
      }, err=>console.log(err)
    );
  }
  ngOnDestroy(): void {
  
  }

}
