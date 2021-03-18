import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ICliente } from 'src/app/Model/Clientes/ICliente';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-mostrar-cliente',
  templateUrl: './mostrar-cliente.component.html',
  styleUrls: ['./mostrar-cliente.component.css']
})
export class MostrarClienteComponent implements OnInit, OnDestroy {

  constructor( private serviceFerreteria: ServiceFerreteriaService, 
    private _ngZone: NgZone, private router: Router) { }

  subscription: Subscription;

  datosClientes: ICliente[] = [];
  //variable para obtener las letras que el evento keyup de template buscar-cliente
  // envía

  sessionesProducto = new Sessiones( this.router );

  datosExample: any = [];

keyUpBuscarCliente: string = "";

// onservable para mostrar los datos que el servidor envia
  dtsOb$: Observable<ICliente[]>;

  ngOnInit(): void 
  {


    this.eventKeyUp();
    // método para obtener los clientes del servidor y mostrarlos en la vista
    this.obtenerClientes();

    this.sessionesProducto.eliminarSession("datosEditarProducto");
    
  }

  editarCliente(event)
  {
    var dts = JSON.parse(sessionStorage.getItem("datosClientes"));

  var datoEditar =  dts.filter(function(hero) {
      return hero.id == event;
  });

  sessionStorage.setItem("ediatrCliente", JSON.stringify(datoEditar) );
  this.router.navigateByUrl('/editarcliente');
  }

  eventKeyUp()
  {
    // obtener los caracteres que envían desde el temprate buscar-cliente
    this.subscription = this.serviceFerreteria.serviceCliente.buscarClienteKeyUp$.subscribe
    (
      res=>
      {
        this.keyUpBuscarCliente = res;

        if( this.keyUpBuscarCliente != "" )
        {
          this.obtenerUnCliente(this.keyUpBuscarCliente);
        }else{
          this.obtenerClientes();
        }
        
      }, 
      err=> console.log(err)
    );
    
    
  }
  obtenerClientes()
  {
    
    this.dtsOb$ = this.serviceFerreteria.serviceCliente.obtenerClientesService();

    this.subscription = this.serviceFerreteria.serviceCliente
    .obtenerClientesService()
    .subscribe
    (
      res=>
      {
        this.datosExample = res;
        sessionStorage.setItem("datosClientes", JSON.stringify(this.datosExample) );
      },err=>console.log(err)
    );

  }
  obtenerUnCliente( nombre: string )
  {
    this.dtsOb$ = this.serviceFerreteria.serviceCliente.getOneCliente(nombre);
  }



  ngOnDestroy(): void 
  {
    this.subscription.unsubscribe();
  }


 

}


