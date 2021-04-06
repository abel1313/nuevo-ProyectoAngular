import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { ICategoria } from 'src/app/Model/Categorias/ICategoria';
import { IProducto } from 'src/app/Model/Productos/IProducto';
import { Productos } from 'src/app/Model/Productos/Producto';
import { ProductoAll } from 'src/app/Model/Productos/ProductoAll';
import { ProductoServer } from 'src/app/Model/Productos/ProductoServer';
import { IProveedor } from 'src/app/Model/Proveedores/IProveedor';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';
import { Tornilleria } from 'src/app/Model/Tornilleria/Tornilleria';

import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';


@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit, OnDestroy {


  formCalando: FormGroup;
  constructor(private serviceProducto: ServiceFerreteriaService, private _ngZone: NgZone,
    private router: Router, private fb: FormBuilder) {



  }
  formProducto = this.fb.group
    ({
      nombreProducto: ['', Validators.required],
      codigoBarraProducto: ['', Validators.required],
      descripccionProducto: ['', Validators.required],
      caracteristicasProducto: ['', Validators.required],
      existenciasProducto: ['', Validators.required],
      precioProducto: ['', Validators.required],

      categorias: ['', Validators.required],
      checkProveedor: ['false', Validators.required],
      newProveedor: [{ value: '', disabled: false }]
    });



  proveedor = new FormControl('');




  nuevoProducto$: Observable<Productos>;
  nuevoProveedor$: Observable<IProveedor>;
  existsCodigoBarra$: Observable<Boolean>;




  existeCodigo: Boolean = false;


  suscription: Subscription;
  datosProveedor$: Observable<any[]>


  tornilleria = new Tornilleria();

  check: Boolean;
  // disabledNewProveedor: Boolean = false;
  btnAgregarProveedor: Boolean = false;

  btnAgregarProducto: Boolean = false;
  mostrarMensaje: Boolean = false;
  mostrarMensajeNuevoProducto: string = '';
  valueKeyUp = '';

  // datos categoría para mostrar en el autocomplete para elejir la categoría
  // a la que pertenece el producto
  datosCategorias: any = [];
  datosCategoria$: Observable<ICategoria[]>;
  datosProveedores$: Observable<IProveedor[]>;

  disabledAutoProveedor: Boolean = false;
  sessionesProducto = new Sessiones(this.router);
  errorProveedor: Boolean = false;
  calandoX: Boolean = false;
  disabledNewProveedor: Boolean = false;
  spinnerAgregarProducto: Boolean = false;

  existeCodigoBarra: Boolean = false;


  producto: Productos =
    {
      idProducto: 0,
      nombreProducto: '',
      codigoBarrasProducto: '',
      descripcionProducto: '',
      caracteristicasProducto: '',
      existenciaProducto: 0,
      precioProducto: 0,
      proveedor:
      {
        id: 0,
        nombreProveedor: ''
      }

    }


  keyword = 'nombreProveedor';
  keywordCategoria = 'nombreCategoria';

  // public pro: Subscription;

  ngOnInit(): void {
    Sessiones.eliminarSessionesReportes('editarMarca');
    this.getDataProveedores();
    this.getCategorias();

    //(this.check) ? console.log(" Habi") : console.log("Desc") ;

    this.sessionesProducto.eliminarSession("datosEditarProducto");



    this.formProducto.get("checkProveedor").valueChanges
      .subscribe((data: Boolean) => {
        let checkBool: Boolean = this.formProducto.get('checkProveedor').value;

        if (checkBool) {

        } else {

        }
      });
  }



  // obtener los datos de los proveedores para mostrarlos en el autocomplete de proveedores
  getDataProveedores(): void {
    this.datosProveedores$ = this.serviceProducto.serviceProveedor.obtenerProveedores();
  }

// evento al seleccionar un proveedor y obtenemos el id y el nombre
  selectEvent(item: any) {
    // do something with selected item
    this.producto.proveedor.nombreProveedor = item.nombreProveedor;
    this.producto.proveedor.id = item.id;
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something when input is focused
  }

  // evento para saber cuando un radi buton esta seleccionado y obtener su valor
  changeS(eve: any) {
    if (eve.target.value === "true") {

      this.calandoX = true;
      this.formProducto.get('newProveedor').setValue('');
      this.formProducto.controls['newProveedor'].disable();

    } else {
      this.proveedor.setValue('');
      this.calandoX = false;
      this.formProducto.controls['newProveedor'].enable()


    }

  }


  // método para gardar el producto
  guardarProducto(producto: IProducto) {


    this._ngZone.runOutsideAngular(() => {
      this.nuevoProducto$ = this.serviceProducto.serviceProducto.nuevoProducto(producto);
      this.nuevoProducto$.subscribe
        (
          res => {
            this._ngZone.run(() => {

              this.spinnerAgregarProducto = false;
              this.mostrarMensajeNuevoProducto = 'El producto se agregó correctamente';
              this.limpiarProducto();
            });
          }
        );

      setTimeout(() => {
        this.mostrarMensaje = false;
      }, 2500);

    });
  }

  // método para guardar el producto pero sin un proveedor, es decir, que primero se agregaria el producto y después el producto
  guardarProductoOrProveedor(producto: IProducto, proveedor: IProveedor) {

    if (proveedor.id == 0) {
      this.mostrarMensaje = true;
      this.mostrarMensajeNuevoProducto = 'Por favor espere, guardando... ';
      this.spinnerAgregarProducto = true;

      this._ngZone.runOutsideAngular(() => {
        this.nuevoProveedor$ = this.serviceProducto.serviceProveedor.nuevoProveedor(proveedor);
        this.nuevoProveedor$.subscribe
          (
            (res: IProveedor) => {
              this._ngZone.run(() => {
                setTimeout(() => {

                  producto.proveedor.id = res.id;

                  this.guardarProducto(producto);
                }, 2500);
              });
            }
          )
      });
    } else {
      this._ngZone.runOutsideAngular(() => {
        // this.nuevoProducto$ =  this.serviceProducto.serviceProducto.nuevoProducto();
        this.mostrarMensaje = true;
        this.mostrarMensajeNuevoProducto = 'Por favor espere, guardando... ';
        this.spinnerAgregarProducto = true;
        setTimeout(() => {

          producto.proveedor.id = proveedor.id;
          this.guardarProducto(producto);
        }, 2500);

      });
    }
  }


  enviarDatos() {

    if (this.formProducto.get('checkProveedor').value == 'false') {
      if (this.formProducto.get('newProveedor').value === '') {
        this.disabledNewProveedor = true;
        setTimeout(() => {
          this.disabledNewProveedor = false;
        }, 2000);
      } else {
        if (this.formProducto.get('nombreProducto').valid && this.formProducto.get('codigoBarraProducto').valid
          && this.formProducto.get('descripccionProducto').valid && this.formProducto.get('caracteristicasProducto').valid &&
          this.formProducto.get('existenciasProducto').valid && this.formProducto.get('precioProducto').valid) {
          let producto = new ProductoServer();
          producto.producto.nombreProducto = this.formProducto.get('nombreProducto').value;
          producto.producto.codigoBarrasProducto = this.formProducto.get('codigoBarraProducto').value;
          producto.producto.descripcionProducto = this.formProducto.get('descripccionProducto').value;
          producto.producto.caracteristicasProducto = this.formProducto.get('caracteristicasProducto').value;
          producto.producto.existenciaProducto = this.formProducto.get('existenciasProducto').value;
          producto.producto.precioProducto = this.formProducto.get('precioProducto').value;

          let pro: IProveedor =
          {
            id: 0,
            nombreProveedor: ''
          }
          pro.id = 0;
          pro.nombreProveedor = this.formProducto.get('newProveedor').value;
          this.guardarProductoOrProveedor(producto.producto, pro);
        }
      }
    }
    else {

      if (this.proveedor.value === '') {
        this.errorProveedor = true;
        setTimeout(() => {
          this.errorProveedor = false;
        }, 2000);
      } else {

        if (this.formProducto.get('nombreProducto').valid && this.formProducto.get('codigoBarraProducto').valid
          && this.formProducto.get('descripccionProducto').valid && this.formProducto.get('caracteristicasProducto').valid &&
          this.formProducto.get('existenciasProducto').valid && this.formProducto.get('precioProducto').valid) {
          let producto = new ProductoServer();
          let proveedor: IProveedor;
          producto.producto.nombreProducto = this.formProducto.get('nombreProducto').value;
          producto.producto.codigoBarrasProducto = this.formProducto.get('codigoBarraProducto').value;
          producto.producto.descripcionProducto = this.formProducto.get('descripccionProducto').value;
          producto.producto.caracteristicasProducto = this.formProducto.get('caracteristicasProducto').value;
          producto.producto.existenciaProducto = this.formProducto.get('existenciasProducto').value;
          producto.producto.precioProducto = this.formProducto.get('precioProducto').value;
          proveedor = this.proveedor.value;
          this.guardarProductoOrProveedor(producto.producto, proveedor);

        }
      }
    }
  }
  // evento click para agregar un producto
  eventAgregarProducto(e: Event) {
    // validamos que el alguna caja este vacía
    e.preventDefault();

    this._ngZone.runOutsideAngular(() => {
      this.existsCodigoBarra$ = this.serviceProducto.serviceProducto.existeCodigoBarra(this.formProducto.get('codigoBarraProducto').value);
      this.existsCodigoBarra$.subscribe
        ((res: Boolean) => {
          this._ngZone.run(() => {


            if (res) {
              this.existeCodigoBarra = res;
              setTimeout(() => {
                this.existeCodigoBarra = false;
              }, 2000);

            } else {
              this.enviarDatos();
            }




          });
        });
    });

  }

  buscarCodigo(e: string) {

    if (e !== '') {
      this._ngZone.runOutsideAngular(() => {
        this.existsCodigoBarra$ = this.serviceProducto.serviceProducto.existeCodigoBarra(e);
        this.existsCodigoBarra$.subscribe
          ((res: Boolean) => {
            this._ngZone.run(() => {
              this.existeCodigo = res;
              this.existeCodigoBarra = res;
              setTimeout(() => {
                this.existeCodigoBarra = false;
              }, 2000);
            });
          });
      });
    }
  }

  onKey(event: any) { // without type info
    this.valueKeyUp += event.target.value + ' | ';
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




  selectEventCategoria(val: any) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    this.tornilleria.tornilleria.categoria.id = val.id;

  }

  onChangeSearchCategoria(e: any) {
    // do something when input is focused
  }
  onFocusedCategoria(even: any) {


  }



  getCategorias() {
    this.datosCategoria$ = this.serviceProducto.seriviceCategoria
      .getCategorias();
  }


  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  limpiarProducto() {

    this.formProducto.get('nombreProducto').setValue('');
    this.formProducto.get('codigoBarraProducto').setValue('');
    this.formProducto.get('descripccionProducto').setValue('');
    this.formProducto.get('caracteristicasProducto').setValue('');
    this.formProducto.get('existenciasProducto').setValue('');
    this.formProducto.get('precioProducto').setValue('');
    this.formProducto.get('categorias').setValue('');
    this.formProducto.get('newProveedor').setValue('');
    this.proveedor.setValue('');


  }

}
