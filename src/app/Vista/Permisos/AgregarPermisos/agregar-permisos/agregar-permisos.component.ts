import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ICliente } from 'src/app/Model/Clientes/ICliente';
import { IMenu } from 'src/app/Model/Menu/IMenu';
import { Menu } from 'src/app/Model/Menu/Menu';
import { IPermisos } from 'src/app/Model/Permisos/IPermisos';
import { Permisos } from 'src/app/Model/Permisos/Permisos';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';
import { Usuario } from 'src/app/Model/Usuarios/Usuario';
import { UsuarioAcceso } from 'src/app/Model/Usuarios/UsuarioAcceso';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';




@Component({
  selector: 'app-agregar-permisos',
  templateUrl: './agregar-permisos.component.html',
  styleUrls: ['./agregar-permisos.component.css']
})
export class AgregarPermisosComponent implements OnInit, OnDestroy {

  formPermisos: FormGroup;
  constructor(private serviceFerreteria: ServiceFerreteriaService,
    private router: Router, private __ngZone: NgZone, private fb: FormBuilder) 
    {

      this.formPermisos = this.fb.group
      ({
        nombreUsuario: new FormControl('', [ Validators.required ]),
        
      });

     }


  datosMenu: any = [];

  usu = new UsuarioAcceso();

  datosMenuArr: any = [];

  calandoArreglo: any = [];

  datosMenu$: Observable<Menu[]>;

  id: any = [];

  mas: Boolean = false;

  menuAdd = new Menu();

  mx = new Menu();

  datosUsuarios$: Observable<Usuario[]>;

  keywordUsuario: string = "nombre_Usuario"

  subscription: Subscription;

  permisos = new Permisos();
  
  sessionProducto = new Sessiones( this.router );

  menu$: Observable<IMenu[]>;
  permiso$: Observable<IPermisos>;

  guardando: Boolean = false;
  mensaje: Boolean = false;
  btnGuardar: Boolean = false;


  ngOnInit(): void {
    this.getMenu();
    this.getUsuarios();

    

    this.sessionProducto.eliminarSession("datosEditarProducto");
    Sessiones.eliminarSessionesReportes('editarMarca');

  }

  getMenu() 
  {

    this.menu$ = this.serviceFerreteria.serviceMenu
      .getMenus();

  }

  getUsuarios() 
  {
    this.datosUsuarios$ = this.serviceFerreteria.serviceUsuario.getUsuarios();
  }

  agregarPermisos( e: Event ) {

    if( ! this.formPermisos.invalid)
    {      
      this.btnGuardar = true;
      this.guardando = true;

      this.calandoArreglo.forEach(element => {

        this.mx.menu.id = parseInt(element) ;
        this.permisos.permisos.menu = this.mx.menu;
        this.__ngZone.runOutsideAngular(()=>
        {
          this.permiso$ = this.serviceFerreteria.servicePermisos
          .guardarPermisos( this.permisos.permisos );
        });
      });

      setTimeout(() => {

       this.formPermisos.get('nombreUsuario').setValue('');   
        
        this.guardando = false;
        this.mensaje = true;
        setTimeout(() => {
          this.btnGuardar = false;
          this.mensaje = false;
        }, 2000);
      }, 2000);
      
    }

    e.preventDefault();


  



  }


  cambiando(event: any, id: any) {

  
    if (event.target.checked) {
      this.calandoArreglo.push(id);

    } else {
      if (this.calandoArreglo.includes(id)) {
        const id2 = this.calandoArreglo.indexOf(id); // 2
        this.calandoArreglo.splice(id2, id);

      }
    }


  }


  // método para seleccionar el id del cliente del autocomplete
  selectEvent(item: any) {
    // do something with selected item

    this.permisos.permisos.usuario = item;
    


  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something when input is focused
  }
  // método para detectar algun cambio que el cliente haga
  changeS(eve: any) {


  }

  validarFormulario() {
    // Example starter JavaScript for disabling form submissions if there are invalid fields

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
      });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}




