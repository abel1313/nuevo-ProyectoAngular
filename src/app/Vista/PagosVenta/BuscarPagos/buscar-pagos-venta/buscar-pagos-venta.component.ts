import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-buscar-pagos-venta',
  templateUrl: './buscar-pagos-venta.component.html',
  styleUrls: ['./buscar-pagos-venta.component.css']
})
export class BuscarPagosVentaComponent implements OnInit, OnDestroy {

  constructor( private serviceFerreteria: ServiceFerreteriaService, private _ngZone: NgZone,
                private router: Router ) { }



                sessionProducto = new Sessiones( this.router );

  ngOnInit(): void 
  {


    this.sessionProducto.eliminarSession("datosEditarProducto");
  }

  keyupBuscarPago( event: KeyboardEvent )
  {
    
  }

  ngZona()
  {
    this._ngZone.runOutsideAngular(() => {
      
        // reenter the Angular zone and display done
        this._ngZone.run(() => { console.log('Outside Done!'); });
      
    });
  }


  




  ngOnDestroy(): void {
    
    // this.suscription.unsubscribe();
  }

}
