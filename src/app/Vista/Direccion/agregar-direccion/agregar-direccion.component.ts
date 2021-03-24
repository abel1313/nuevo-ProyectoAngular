import { Component, NgZone, OnInit } from '@angular/core';
import { Direccion } from 'src/app/Model/Direccion/Direccion';
import { Validar } from 'src/app/Model/Validar/Validar';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-agregar-direccion',
  templateUrl: './agregar-direccion.component.html',
  styleUrls: ['./agregar-direccion.component.css']
})
export class AgregarDireccionComponent implements OnInit {

  constructor( private serviceFerreteria: ServiceFerreteriaService,
                _ngZone: NgZone) { }

 spinnerDireccion: Boolean = false;               
  mensajeListo: Boolean = false;
  disableComplete: Boolean = false;
  cancelarListo: Boolean = false;

  validar = new Validar();

  caracteristicas: Boolean = false;
  descripccion: Boolean = false;
  municipio: Boolean = false;

  direccion = new Direccion();

  
  diabledInputDireccion: Boolean = false;

  

  ngOnInit(): void 
  {
  }

  // evento click para enviar la direccion a la venta y guardarla
  completeDireccion()
  {
    // this.direccion.direccion.municipioDireccion
    // this.direccion.direccion.caracteristicasDireccion
    // this.direccion.direccion.descripccionDireccion
    
    // mostrar el snipper en el boton y desabilitarlo

    

    this.caracteristicas =
    this.validar.validarInput(this.direccion.direccion.caracteristicasDireccion);

    this.descripccion =
    this.validar.validarInput(this.direccion.direccion.descripccionDireccion);

    this.municipio =
    this.validar.validarInput(this.direccion.direccion.municipioDireccion);

    if( !this.caracteristicas && !this.descripccion && !this.municipio )
    {
      
      this.spinnerDireccion = true;
      this.disableComplete = true;
  
      setTimeout(() => {
        this.spinnerDireccion = false;
        this.mensajeListo = true;
        this.cancelarListo = true;
        
        this.serviceFerreteria.serviceVenta.direccion$.emit(this.direccion.direccion);

      }, 1500);
    }


  }
  cancelarDireccion()
  {
    this.cancelarListo = false;
    this.mensajeListo = false;
    this.disableComplete = false;
  }
}
