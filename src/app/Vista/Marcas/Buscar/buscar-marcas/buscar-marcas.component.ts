import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IMarcas } from 'src/app/Model/Marcas/IMarcas';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-buscar-marcas',
  templateUrl: './buscar-marcas.component.html',
  styleUrls: ['./buscar-marcas.component.css']
})
export class BuscarMarcasComponent implements OnInit {


  constructor
    (
      private router: Router,
      private _ngZone: NgZone,
      private ServiceFerreteriaService: ServiceFerreteriaService
    ) { }

  marcas$: Observable<IMarcas[]>;



  dataSource: IMarcas[];



  ngOnInit(): void {
    Sessiones.eliminarSessionesReportes('editarMarca');
    this.getMarcas();

  }

  getMarcas() {
    this.marcas$ = this.ServiceFerreteriaService.servicemarca.getMarcas();

  }
  editarMarca(marca: IMarcas) {
    this.ServiceFerreteriaService.servicemarca.marcas$.emit(marca);

    sessionStorage.setItem('editarMarca', JSON.stringify(marca));


    this.router.navigateByUrl('marcas/editar');
  }


}


