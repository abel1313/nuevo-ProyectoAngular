import { Component, HostBinding, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent implements OnInit {
@HostBinding("class") classe = "row"
  constructor( private serviceFerreteria: ServiceFerreteriaService,
    private _ngZone: NgZone, private router: Router ) { }

    sessionProducto = new Sessiones( this.router );
  ngOnInit(): void 
  {

    this.sessionProducto.eliminarSession("datosEditarProducto");
    Sessiones.eliminarSessionesReportes('editarMarca');
  }

}
