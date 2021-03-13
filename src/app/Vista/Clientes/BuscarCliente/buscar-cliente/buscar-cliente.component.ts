import { Component, OnInit } from '@angular/core';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
  styleUrls: ['./buscar-cliente.component.css']
})
export class BuscarClienteComponent implements OnInit {

  constructor( private serviceFerreteria: ServiceFerreteriaService ) { }

  ngOnInit(): void 
  {

  }
  keyUpBuscarCliente( event: any)
  {
    this.serviceFerreteria.serviceCliente.buscarClienteKeyUp$.emit(event);
  }

}
