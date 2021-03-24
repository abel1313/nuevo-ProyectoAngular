import { Component, ElementRef, NgZone, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Cliente } from 'src/app/Model/Clientes/Cliente';
import { ICliente } from 'src/app/Model/Clientes/ICliente';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';
import { Validar } from 'src/app/Model/Validar/Validar';

import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-agregar-persona',
  templateUrl: './agregar-persona.component.html',
  styleUrls: ['./agregar-persona.component.css']
})
export class AgregarPersonaComponent implements OnInit, OnDestroy {

  @ViewChild('checkClando') calndo: ElementRef;

  constructor(private serviceFerreteria: ServiceFerreteriaService,
    private router: Router, private _ngZone: NgZone,
    private render: Renderer2) { }

    nocumole: Boolean = false;

  mostrarTemplate: Boolean = true;
  btnAgregar: Boolean = false;

  btnMensaje: Boolean = false;
  btnMensajeAgregar: Boolean = false;

  udateCliente$: Observable<any>;

  diabledInputClientePersona: Boolean = false;


  selectedItem: Boolean = false;
  mensajeEditar: Boolean = false;



      validarnombre: Boolean = false;
      validartelefono: Boolean = false;
      validarpaterno: Boolean = false;
      validarmaterno: Boolean = false;
    seguimos: Boolean = false;


    mensajeAgregar = '';
    mostrarMensaje: string;

  subscription: Subscription;
  pathString = '';
  editarClientex: ICliente;

  editarCliente$: Observable<ICliente[]>;

  chechVenta: Boolean = false;

  cliente = new Cliente();

  sessionProducto = new Sessiones( this.router );


  ngOnInit(): void {

    this.mensajeAgregar = this.router.url;

   
    
    if(this.mensajeAgregar == "/mostrarproductos")
    {
        this.chechVenta = true;
    }
    if(this.mensajeAgregar == "/editarcliente")
    {
      
        this.editarClientex = sessionStorage.getItem("ediatrCliente") != null ?
        JSON.parse(sessionStorage.getItem("ediatrCliente")) : null;
  
        this.mostrarMensaje = 'Editar cliente';
        
  
  
        this.cliente.cliente = this.editarClientex[0];
        if( this.cliente.cliente.id != 0 )
        {
          
   
  
        }
      

      
    }
    if(this.mensajeAgregar == "/cliente")
    {
      this.mostrarMensaje = 'Nuevo cliente';
    }


    this.sessionProducto.eliminarSession("datosEditarProducto");
    

    // this.cliente.cliente.persona.generoPersona = this.cliente.cliente.persona.generoPersona == "" ? "Seleccione su género" : this.cliente.cliente.persona.generoPersona;
  }

  seguimosVenta()
  {

  this.mostrarMensajeValidadr();

    // if(this.cliente.cliente.persona.nombrePersona == '' )
    // {
    //   this.nocumole = true;
      
    //   setTimeout(() => {
       
    //     this.nocumole = false;
    //   }, 1500);
    // }


  }


  agregarCliente() {
  //  let genero = (<HTMLSelectElement>document.getElementById('genero')).value;

    if (this.cliente.cliente.persona.nombrePersona == '' ||
      this.cliente.cliente.persona.paternoPersona == '' ||
      this.cliente.cliente.persona.maternoPersona == '' ||
      this.cliente.cliente.persona.telefonoPersona == '' 
    ) {
      this.validForm();
    }
    else
      if (
        this.cliente.cliente.persona.nombrePersona != '' &&
        this.cliente.cliente.persona.paternoPersona != '' &&
        this.cliente.cliente.persona.maternoPersona != '' &&
        this.cliente.cliente.persona.telefonoPersona != '' 

      ) {
        if (this.mensajeAgregar == "/cliente") {
          

          this.btnMensaje = true;

          this.guardarCliente();

          setTimeout(() => { this.btnMensaje = false; }, 2000);

          setTimeout(() => { this.btnMensajeAgregar = false; }, 2000);

          setTimeout(() => { this.btnMensajeAgregar = true; }, 2100);

          setTimeout(() => { this.btnMensajeAgregar = false; }, 3200);


        }
        if (this.mensajeAgregar == "/editarcliente") {
          
          this.udateCliente$ = this.serviceFerreteria
          .serviceCliente.actualizarCliente(this.cliente.cliente);
          this.udateCliente$.subscribe
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
      this.udateCliente$ = this.serviceFerreteria.serviceCliente
        .guardarCliente(this.cliente.cliente);
        this.udateCliente$.subscribe
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
    this.cliente.cliente.persona.telefonoPersona = '';
    

  }

  cancelarSeguimos()
  {
    this.seguimos = false;
    this.diabledInputClientePersona = false;
  }
mostrarMensajeValidadr()
{
  let validarCampos = new Validar();

    
  this.validarnombre = validarCampos
   .validarInput(this.cliente.cliente.persona.nombrePersona);
   this.validartelefono = validarCampos
   .validarInput(this.cliente.cliente.persona.telefonoPersona);
   this.validarmaterno = validarCampos
   .validarInput(this.cliente.cliente.persona.maternoPersona);
   this.validarpaterno = validarCampos
   .validarInput(this.cliente.cliente.persona.paternoPersona);
   
   if( !this.validarnombre && !this.validartelefono && 
      !this.validarmaterno && !this.validarpaterno)
   {
    this.seguimos = true;
    this.diabledInputClientePersona = true;
    this.serviceFerreteria.serviceVenta.ventaCliente$.emit(this.cliente.cliente);
   }


}

  ngOnDestroy(): void {
  //  this.subscription.unsubscribe();
  }


}
