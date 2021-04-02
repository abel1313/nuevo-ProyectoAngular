import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IMarcas } from 'src/app/Model/Marcas/IMarcas';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-buscar-marcas',
  templateUrl: './buscar-marcas.component.html',
  styleUrls: ['./buscar-marcas.component.css']
})
export class BuscarMarcasComponent implements OnInit {
  

  constructor
  (
    private router:Router,
    private _ngZone :NgZone,
    private ServiceFerreteriaService: ServiceFerreteriaService
  ) { }

  marcas$: Observable<IMarcas[]>;

  
 
  dataSource: IMarcas[];

  

  ngOnInit(): void 
  {
    
this.getMarcas();

  }

  getMarcas()
  {
    this.marcas$ = this.ServiceFerreteriaService.servicemarca.getMarcas();
    
  }
  

}


