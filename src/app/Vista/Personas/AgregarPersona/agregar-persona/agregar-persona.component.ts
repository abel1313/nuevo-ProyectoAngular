import { Component, ElementRef, NgZone, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Cliente } from 'src/app/Model/Clientes/Cliente';
import { ICliente } from 'src/app/Model/Clientes/ICliente';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';
import { forbiddenNameValidator, Validar } from 'src/app/Model/Validar/Validar';



import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-agregar-persona',
  templateUrl: './agregar-persona.component.html',
  styleUrls: ['./agregar-persona.component.css']
})
export class AgregarPersonaComponent implements OnInit {

  @ViewChild('checkClando') calndo: ElementRef;



  constructor(private serviceFerreteria: ServiceFerreteriaService,
    private router: Router, private _ngZone: NgZone,
    private render: Renderer2, private fb: FormBuilder) { }
  formProducto = this.fb.group
    ({

      nomPersona: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      paternoPersona: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      maternoPersona: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      telefonoPersona: ['', [Validators.required]]

    });

  nocumole: Boolean = false;

  validNumber: Boolean = false;
  longitud: any;

  mostrarTemplate: Boolean = true;
  btnAgregar: Boolean = false;

  btnMensaje: Boolean = false;
  btnMensajeAgregar: Boolean = false;
  mostrarBottonCliente: Boolean = false;
  udateCliente$: Observable<any>;
  guardarClientePerson$: Observable<ICliente>;

  diabledInputClientePersona: Boolean = false;
  buttonGuardarCliente: Boolean = false;
  buttonGuardarClienteDisabled: Boolean = false;
  guardarBoolean: Boolean = false;

  barraLateran: Boolean = false;

  selectedItem: Boolean = false;
  mensajeEditar: Boolean = false;



  validarnombre: Boolean = false;
  validartelefono: Boolean = false;
  validarpaterno: Boolean = false;
  validarmaterno: Boolean = false;
  seguimos: Boolean = false;
  verificarInformacion: Boolean = false;0


  uriNavegado = '';
  mostrarMensaje: string;


  pathString = '';
  editarClientex: ICliente;

  editarCliente$: Observable<ICliente[]>;

  chechVenta: Boolean = false;

  cliente = new Cliente();

  sessionProducto = new Sessiones(this.router);

  mensajeEspera: string = '';
  mensajeGuardado: string = '';

  ngOnInit(): void {

    // elimina la sesion de editar alguna marca en caso de que el usuario notermine de editar la marca y se dirija a esta ista
    Sessiones.eliminarSessionesReportes('editarMarca');
    // obtenemos la uri del navedaro y la guardamos en esta variable
    this.uriNavegado = this.router.url;



    // se validan las uri para ver que acción realiza
    if (this.uriNavegado == "/productos/buscar") {
      this.chechVenta = true;
    }
    if (this.uriNavegado == "/clientes/editarcliente") {
      this.editarClientex = sessionStorage.getItem("ediatrCliente") != null ?
        JSON.parse(sessionStorage.getItem("ediatrCliente")) : null;

      this.mostrarMensaje = 'Editar cliente';
      this.mostrarBottonCliente = true;
      this.mensajeEspera = 'Por favor espere, se está guardando ...';
      this.mensajeGuardado = ' El cliente se actualizó correctamente';
      this.cliente.cliente = this.editarClientex[0];



      this.formProducto.get('nomPersona').setValue(this.cliente.cliente.persona.nombrePersona );
      this.formProducto.get('paternoPersona').setValue(this.cliente.cliente.persona.paternoPersona );
      this.formProducto.get('maternoPersona').setValue(this.cliente.cliente.persona.maternoPersona );
      this.formProducto.get('telefonoPersona').setValue(this.cliente.cliente.persona.telefonoPersona );



    }
    if (this.uriNavegado == "/clientes/nuevo") {
      this.mostrarMensaje = 'Nuevo cliente';
      this.mensajeEspera = 'Por favor espere, se está guardando ...';
      this.mensajeGuardado = ' El cliente se guardo correctamente';
      this.mostrarBottonCliente = true;
    }


    this.sessionProducto.eliminarSession("datosEditarProducto");


    // this.cliente.cliente.persona.generoPersona = this.cliente.cliente.persona.generoPersona == "" ? "Seleccione su género" : this.cliente.cliente.persona.generoPersona;
  }

  seguimosVenta() {

    this.mostrarMensajeValidadr();
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
        if (this.uriNavegado == "/clientes/nuevo") {
          this.btnMensaje = true;
          this.guardarCliente();
          setTimeout(() => { this.btnMensaje = false; }, 2000);
          setTimeout(() => { this.btnMensajeAgregar = false; }, 2000);
          setTimeout(() => { this.btnMensajeAgregar = true; }, 2100);
          setTimeout(() => { this.btnMensajeAgregar = false; }, 3200);
        }
        if (this.uriNavegado == "/clientes/editarcliente") {

          this.udateCliente$ = this.serviceFerreteria
            .serviceCliente.actualizarCliente(this.cliente.cliente);
          this.udateCliente$.subscribe
            (
              res => {
                sessionStorage.removeItem("ediatrCliente");
                this.mensajeEditar = true;
                setTimeout(() => {
                  this.mensajeEditar = false;
                  this.router.navigateByUrl('/buscarcliente');
                }, 2000);


              },
              err => console.log(err)
            );

        }

      }
  }


  editarCliente(): Boolean {

    return true;
  }

  _keyUpLongitud(event: any) {
    this.longitud = event.length;
  }




  btnGuardarCliente(event: any) {
    event.preventDefault();

    if (this.uriNavegado == "/clientes/nuevo") 
    {
      if (parseInt(this.longitud) === 10) {
        if (this.formProducto.get('nomPersona').valid && this.formProducto.get('telefonoPersona').valid &&
          this.formProducto.get('paternoPersona').valid && this.formProducto.get('maternoPersona').valid) {
          this.buttonGuardarClienteDisabled = true;
          this.buttonGuardarCliente = true;
          this.serverGuardarCliente();
        }
      }
      else {
        this.validNumber = true;
        setTimeout(() => {
          this.validNumber = false;
        }, 2000);
      }
    }

    if (this.uriNavegado == "/clientes/editarcliente") 
  {

if (parseInt(this.longitud) === 10) {
  if (this.formProducto.get('nomPersona').valid && this.formProducto.get('telefonoPersona').valid &&
    this.formProducto.get('paternoPersona').valid && this.formProducto.get('maternoPersona').valid) {

      let clientex = new Cliente();

      clientex.cliente.id = this.cliente.cliente.id;
      clientex.cliente.persona.id = this.cliente.cliente.persona.id;
      clientex.cliente.persona.nombrePersona = this.formProducto.get('nomPersona').value;
      clientex.cliente.persona.telefonoPersona = this.formProducto.get('telefonoPersona').value;
      clientex.cliente.persona.paternoPersona = this.formProducto.get('paternoPersona').value;
      clientex.cliente.persona.maternoPersona = this.formProducto.get('maternoPersona').value;

    this.buttonGuardarClienteDisabled = true;
    
    this.mensajeEspera = 'Espere, el cliente se esta actualizando';
    this.editarClientes(clientex.cliente);
  }
}
else {
  this.validNumber = true;
  setTimeout(() => {
    this.validNumber = false;
  }, 2000);
}

  }



  }

  serverGuardarCliente() {

    let clientex = new Cliente();

    clientex.cliente.persona.nombrePersona = this.formProducto.get('nomPersona').value;
    clientex.cliente.persona.telefonoPersona = this.formProducto.get('telefonoPersona').value;
    clientex.cliente.persona.paternoPersona = this.formProducto.get('paternoPersona').value;
    clientex.cliente.persona.maternoPersona = this.formProducto.get('maternoPersona').value;

    

    this._ngZone.runOutsideAngular(() => {
      this.guardarClientePerson$ = this.serviceFerreteria.serviceCliente
        .guardarCliente(clientex.cliente);
      this.guardarClientePerson$.subscribe
        (
          (res: ICliente) => {
            this._ngZone.run(() => {
              if (res.id != 0) {
                //  this.btnMensajeAgregar = true;
                this.guardarBoolean = true;
                setTimeout(() => {
                  this.guardarBoolean = false;
                  this.limpiarInput();
                }, 2000);

                setTimeout(() => {
                  this.router.navigateByUrl('/clientes/buscar');
                }, 3500);


              }

            });
          },
          err => console.log(err)
        );
    });

  }

  editarClientes( editar: ICliente )
  {
    this._ngZone.runOutsideAngular(() => {
      this.udateCliente$ = this.serviceFerreteria.serviceCliente
        .actualizarCliente( editar );
      this.udateCliente$.subscribe
        (
          res => {

this._ngZone.run(()=>
{
  setTimeout(() => {
    this.buttonGuardarClienteDisabled = false;
    this.mensajeEspera = '';

    this.guardarBoolean = true;
    this.mensajeGuardado = 'Se actualizó correctamente';

    setTimeout(() => {
      this.guardarBoolean = false;
      this.mensajeGuardado = '';

      setTimeout(() => {
        this.router.navigateByUrl('/productos/buscar');
        this.limpiarInput();
      }, 200);
    }, 2500);
  }, 2000);
            
   this._ngZone.run(()=>
   {

   });
});
            

            
          },
          err => console.log(err)
        );
    });
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

  cancelarSeguimos() {
    this.seguimos = false;
    this.diabledInputClientePersona = false;
  }



  mostrarMensajeValidadr() {
 


console.log(this.longitud);
      let clienteSeguimos = new Cliente();

      clienteSeguimos.cliente.persona.nombrePersona = this.formProducto.get('nomPersona').value;
      clienteSeguimos.cliente.persona.telefonoPersona = this.formProducto.get('telefonoPersona').value;
      clienteSeguimos.cliente.persona.paternoPersona = this.formProducto.get('paternoPersona').value;
      clienteSeguimos.cliente.persona.maternoPersona = this.formProducto.get('maternoPersona').value;
      

      if( this.longitud == 10 )
      {
        if (
          this.formProducto.get('nomPersona').valid &&
          this.formProducto.get('telefonoPersona').valid &&
          this.formProducto.get('paternoPersona').valid &&
          this.formProducto.get('maternoPersona').valid 
        ) {
          
          this.serviceFerreteria.serviceVenta.ventaCliente$.emit(clienteSeguimos.cliente);
          this.barraLateran = true;
          this.seguimos = true;
          setTimeout(() => {
            this.barraLateran = false;
           
          }, 2000);
        }else
        {
          this.verificarInformacion = true;
          this.mensajeEspera = 'Verifique su información';
          setTimeout(() => {
            this.verificarInformacion = false;
            this.mensajeEspera = '';
          }, 2000);
        }
      }
      else
      {
        this.verificarInformacion = true;
        this.mensajeEspera = 'El número de celular debe contener 10 dígitos';
        setTimeout(() => {
          this.verificarInformacion = false;
          this.mensajeEspera = '';
        }, 2000);
      }



  }





}
