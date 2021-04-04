import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { ICategoria } from 'src/app/Model/Categorias/ICategoria';
import { Productos } from 'src/app/Model/Productos/Producto';
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

  formPrducto: FormControl;

  constructor(private serviceProducto: ServiceFerreteriaService, private _ngZone: NgZone,
    private router: Router, private fb: FormBuilder ) 
    {
     this.formPrducto = fb.control
      ({
        nombreProducto: new FormControl(''),
        codigoBarraProducto: new FormControl(''),
        DesciptcionProducto: new FormControl(''),
        CaracteriasticasProducto: new FormControl(''),
        existenciasProducto: new FormControl(''),
        precioProducto: new FormControl(''),
        proveedor: new FormControl(''),
      });
     }

  suscription: Subscription;
  datosProveedor$: Observable<any[]>


  tornilleria = new Tornilleria();

  check: Boolean;
  disa: Boolean = false;
  btnAgregarProveedor: Boolean = false;

  btnAgregarProducto: Boolean = false;
  mostrarMensaje: Boolean = false;
  valueKeyUp = '';
  datosProveedores: any = [];
  // datos categoría para mostrar en el autocomplete para elejir la categoría
  // a la que pertenece el producto
  datosCategorias: any = [];

  sessionesProducto = new Sessiones(this.router);


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

  }


  getDataProveedores(): void {
    this.suscription = this.serviceProducto.serviceProveedor.obtenerProveedores()
      .subscribe
      (
        res => {
          // console.log(res);
          this.datosProveedores = res;
          //  console.log(this.datosProveedores);
        },
        error => console.log(error)
      );

  }


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
  changeS(eve: any) {
    if (eve.target.value === "true") {
      this.disa = true;
      setTimeout(() => { // this will make the execution after the above boolean has changed
        let nomProveedor = document.getElementById("lblNomProveedor");
        nomProveedor.focus();
        this.producto.proveedor.id = 0;


      }, 100);
      this.btnAgregarProveedor = true;
    } else {
      this.disa = false;
      this.btnAgregarProveedor = false;
      setTimeout(() => { // this will make the execution after the above boolean has changed

      }, 100);

    }

  }
  // evento click para agregar un producto
  eventAgregarProducto() {
    // validamos que el alguna caja este vacía
    if (this.producto.nombreProducto == "" || this.producto.codigoBarrasProducto == "" || this.producto.descripcionProducto == "" ||
      this.producto.caracteristicasProducto == "" || this.producto.existenciaProducto == 0 || this.producto.precioProducto == 0 ||
      this.producto.proveedor.nombreProveedor == "" || this.tornilleria.tornilleria.categoria.id == 0) {
      // si alguna caja está vacía  se ejecuta este método que solo muestra un mensaje en la vista para el ususario
      this.validarFormulario();

      

      // valoda que las casas de texto no esten vacías
    } else if (this.producto.nombreProducto != "" || this.producto.codigoBarrasProducto != "" || this.producto.descripcionProducto != "" ||
      this.producto.caracteristicasProducto != "" || (this.producto.existenciaProducto != 0 && isNaN(this.producto.existenciaProducto)) ||
      (this.producto.precioProducto != 0 && isNaN(this.producto.precioProducto)) ||
      this.producto.proveedor.nombreProveedor != "" && this.tornilleria.tornilleria.categoria.id != 0) {
      // valida que el proveedor y el nombre de proveedor se agregen
      if (this.producto.proveedor.id > 0 && this.producto.proveedor.nombreProveedor != "") {
        this.btnAgregarProducto = true;
        setTimeout(() => {
          this._ngZone.runOutsideAngular(() => {
            // realiza el service para agregar el producto

            this.suscription = this.serviceProducto.serviceProducto.guardarProducto(this.producto)
              .subscribe
              (
                res => {

                  // this.tornilleria.tornilleria.producto.id = res.id;


                },
                error => console.log(error)
              );
            // reenter the Angular zone and display done
            this._ngZone.run(() => {
              //  console.log('Outside Done!'); 

            });

          });
          this.limpiarProducto();
          this.btnAgregarProducto = false;
        }, 3000);

        this.mostrarMensaje = true;
        setTimeout(() => {
          this.mostrarMensaje = false;
        }, 3500);

      }
      // si el usuario agrega un proveedor lo agrega y despúes agrega el producto
      else if (this.producto.proveedor.id == 0 && this.producto.proveedor.nombreProveedor != "") {
        //console.log("nuevo proveedor ");
        this.btnAgregarProducto = true;

        setTimeout(() => {
          this._ngZone.runOutsideAngular(() => {
            // realiza el service para agregar el proveedor
            this.suscription = this.serviceProducto.serviceProveedor.guardarProveedor(this.producto.proveedor)
              .subscribe
              (
                res => {

                  this.producto.proveedor.id = res.id;
                  this.suscription = this.serviceProducto.serviceProducto.guardarProducto(this.producto)
                    .subscribe
                    (
                      res => {

                        // console.log(res);
                      },
                      error => console.log(error)
                    );
                },
                error => console.log(error)
              );
            // reenter the Angular zone and display done
            this._ngZone.run(() => {
              // console.log('Outside Done!'); 
            });

          });
          this.limpiarProducto();
          this.btnAgregarProducto = false;
        }, 3000);
        this.mostrarMensaje = true;
        setTimeout(() => {
          this.mostrarMensaje = true;
        }, 2000);

      }
      // console.log(this.producto);







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
    this.suscription = this.serviceProducto.seriviceCategoria
      .getCategorias()
      .subscribe
      (
        res => {
          this.datosCategorias = res;
        },
        err => console.log(err)
      );
  }


  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  limpiarProducto() {

    this.producto.idProducto = 0;
    this.producto.nombreProducto = '';
    this.producto.codigoBarrasProducto = '';
    this.producto.descripcionProducto = '';
    this.producto.caracteristicasProducto = '';
    this.producto.existenciaProducto = 0;
    this.producto.precioProducto = 0;
    this.producto.proveedor.id = 0;
    this.producto.proveedor.nombreProveedor = '';

  }

}
