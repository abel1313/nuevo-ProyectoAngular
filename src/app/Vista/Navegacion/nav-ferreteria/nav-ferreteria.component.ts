import { Component, OnInit } from '@angular/core';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-nav-ferreteria',
  templateUrl: './nav-ferreteria.component.html',
  styleUrls: ['./nav-ferreteria.component.css']
})
export class NavFerreteriaComponent implements OnInit {

  constructor( private serviceFerreteria: ServiceFerreteriaService ) { }

  ngOnInit(): void 
  {

  }



}
