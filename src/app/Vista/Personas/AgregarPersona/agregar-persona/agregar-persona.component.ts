import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Cliente } from 'src/app/Model/Clientes/Cliente';
import { ICliente } from 'src/app/Model/Clientes/ICliente';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';

import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-agregar-persona',
  templateUrl: './agregar-persona.component.html',
  styleUrls: ['./agregar-persona.component.css']
})
export class AgregarPersonaComponent implements OnInit, OnDestroy {

  constructor(private serviceFerreteria: ServiceFerreteriaService,
    private router: Router, private _ngZone: NgZone) { }


  mostrarTemplate: Boolean = true;
  btnAgregar: Boolean = false;

  btnMensaje: Boolean = false;
  btnMensajeAgregar: Boolean = false;

  selectedItem: Boolean = false;
  mensajeEditar: Boolean = false;

    mensajeAgregar = '';
    mostrarMensaje: string;

  subscription: Subscription;
  pathString = '';
  editarClientex: ICliente;

  editarCliente$: Observable<ICliente[]>;

  cliente = new Cliente();

  sessionProducto = new Sessiones( this.router );


  ngOnInit(): void {

    this.mensajeAgregar = this.router.url;

    
    if(this.mensajeAgregar == "/editarcliente")
    {
      
      
  
        this.editarClientex = sessionStorage.getItem("ediatrCliente") != null ?
        JSON.parse(sessionStorage.getItem("ediatrCliente")) : null;
  
        this.mostrarMensaje = 'Editar cliente';
        
  
  
        this.cliente.cliente = this.editarClientex[0];
        if( this.cliente.cliente.id != 0 )
        {
          
          this.selectedItem = 
          (this.cliente.cliente.persona.generoPersona == "Hombre")
          ? true : false;
  
        }
      

      
    }
    if(this.mensajeAgregar == "/cliente")
    {
      this.mostrarMensaje = 'Nuevo cliente';
    }


    this.sessionProducto.eliminarSession("datosEditarProducto");
    

    // this.cliente.cliente.persona.generoPersona = this.cliente.cliente.persona.generoPersona == "" ? "Seleccione su género" : this.cliente.cliente.persona.generoPersona;
  }




  agregarCliente() {
    let genero = (<HTMLSelectElement>document.getElementById('genero')).value;

    if (this.cliente.cliente.persona.nombrePersona == '' ||
      this.cliente.cliente.persona.paternoPersona == '' ||
      this.cliente.cliente.persona.maternoPersona == '' ||
      this.cliente.cliente.persona.fechanacimientosPersona == '' ||
      this.cliente.cliente.persona.correoelectronicoPersona == '' ||
      genero == "Seleccione su género"
    ) {
      this.validForm();


    }
    else
      if (
        this.cliente.cliente.persona.nombrePersona != '' &&
        this.cliente.cliente.persona.paternoPersona != '' &&
        this.cliente.cliente.persona.maternoPersona != '' &&
        this.cliente.cliente.persona.fechanacimientosPersona != '' &&
        this.cliente.cliente.persona.correoelectronicoPersona != '' &&
        genero != "Seleccione su género"

      ) {
        if (this.mensajeAgregar == "/cliente") {
          this.cliente.cliente.persona.generoPersona = genero;

          this.btnMensaje = true;

          this.guardarCliente();

          setTimeout(() => { this.btnMensaje = false; }, 2000);

          setTimeout(() => { this.btnMensajeAgregar = false; }, 2000);

          setTimeout(() => { this.btnMensajeAgregar = true; }, 2100);

          setTimeout(() => { this.btnMensajeAgregar = false; }, 3200);


        }
        if (this.mensajeAgregar == "/editarcliente") {
          this.cliente.cliente.persona.generoPersona = genero;
         


          this.subscription = this.serviceFerreteria
          .serviceCliente.actualizarCliente(this.cliente.cliente)
          .subscribe
          (
            res=>
            {
              sessionStorage.removeItem("ediatrCliente");
              this.mensajeEditar = true; 
              setTimeout(() => 
              {
                this.mensajeEditar = false;
                this.router.navigateByUrl('/buscarcliente');
              }, 2000);
             
              
            },
            err=> console.log(err)
          );
          
        }

      }
  }


  editarCliente(): Boolean 
  {

    return true;
  }

  guardarCliente() {

    this._ngZone.runOutsideAngular(() => {
      this.subscription = this.serviceFerreteria.serviceCliente
        .guardarCliente(this.cliente.cliente)
        .subscribe
        (
          res => {
            this.limpiarInput();
            

          },
          err => console.log(err)
        );
    });

  }


  validForm() {
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (function () {
      'use strict'

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
        .forEach(function (form: any) {
          form.addEventListener('submit', function (event: any) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }

            form.classList.add('was-validated')
          }, false)
        })
    })()
  }

  limpiarInput() {

    this.cliente.cliente.id = 0;
    this.cliente.cliente.persona.id = 0;
    this.cliente.cliente.persona.nombrePersona = '';
    this.cliente.cliente.persona.paternoPersona = '';
    this.cliente.cliente.persona.maternoPersona = '';
    this.cliente.cliente.persona.fechanacimientosPersona = '';
    this.cliente.cliente.persona.correoelectronicoPersona = '';

  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
