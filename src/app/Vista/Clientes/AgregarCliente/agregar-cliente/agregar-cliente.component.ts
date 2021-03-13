import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit, OnDestroy {

  constructor( private serviceFerreteria: ServiceFerreteriaService ) { }

  suscription: Subscription;

 

  ngOnInit(): void 
  {

    
  }

  btnCalando()
  {
  
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}


