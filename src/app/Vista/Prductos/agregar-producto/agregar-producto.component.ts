import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { Productos } from 'src/app/Model/Productos/Producto';
import { IProveedor } from 'src/app/Model/Proveedores/IProveedor';

import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit, OnDestroy {

  constructor(private serviceProducto: ServiceFerreteriaService , private _ngZone: NgZone) { }

  suscription: Subscription;
  datosProveedor$: Observable<any[]>

  check: Boolean ;
  disa: Boolean = false;
  btnAgregarProveedor: Boolean = false;

  datosProveedores: any = [];

  producto: Productos = 
  {
    idProducto: 0,
    nombreProducto: '',
    codigoBarrasProducto: '',
    descripcionProducto: '',
    caracteristicasProducto: '',
    existenciaProducto: 0,
    precioProducto: 0,
    idProveedor: 0,
    nombreProveedor: ''

}
proveedor: IProveedor = 
{
  
    idProveedor: 0,
    nombreProveedor: ''
  
}
  

  keyword = 'nombreProveedor';

 // public pro: Subscription;
  
  ngOnInit(): void 
  {
    this.getDataProveedores();
    

    //(this.check) ? console.log(" Habi") : console.log("Desc") ;



  }

  
  getDataProveedores(): void
  {
    this.suscription =  this.serviceProducto.serviceProveedor.obtenerProveedores()
    .subscribe
    (
      res => 
      {
       // console.log(res);
        this.datosProveedores = res;
          console.log(this.datosProveedores);
      },
      error => console.log(error)
    );

  }


  selectEvent(item: any) {
    // do something with selected item
    this.producto.nombreProveedor = item.nombreProveedor;
    this.producto.idProveedor = item.id;


  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e: any){
    // do something when input is focused
  }
  changeS(eve: any)
  {
    if(eve.target.value === "true")
    {
      this.disa  = true;
      setTimeout(()=>{ // this will make the execution after the above boolean has changed
        let nomProveedor = document.getElementById("lblNomProveedor");
        nomProveedor.focus();
        this.producto.idProveedor = 0;
        
      
      },100); 
      this.btnAgregarProveedor = true;
    }else{
      this.disa  = false;
      this.btnAgregarProveedor = false;
      setTimeout(()=>{ // this will make the execution after the above boolean has changed
        
      },100); 
      
    }
    
  }
  
  eventAgregarProducto()
  {
  
    if(this.producto.nombreProducto == "" || this.producto.codigoBarrasProducto == "" ||this.producto. descripcionProducto == "" || 
    this.producto.caracteristicasProducto == "" || this.producto.existenciaProducto == 0 || this.producto.precioProducto == 0 || 
    this.producto.nombreProveedor == "" )
    {
      this.validarFormulario();

    }else  if(this.producto.nombreProducto != "" || this.producto.codigoBarrasProducto != "" ||this.producto. descripcionProducto != "" || 
    this.producto.caracteristicasProducto != "" || ( this.producto.existenciaProducto != 0 && isNaN( this.producto.existenciaProducto ) ) || 
    ( this.producto.precioProducto != 0 && isNaN( this.producto.precioProducto ) ) || 
    this.producto.nombreProveedor != "" )
    {

      if( this.producto.idProveedor > 0 && this.producto.nombreProveedor != "" )
      {
    
        this._ngZone.runOutsideAngular(() => {
    
          
          this.suscription =  this.serviceProducto.serviceProducto.guardarProducto(this.producto)
          .subscribe
          (
            res => 
            {
             // console.log(res);
            
                console.log(res);
            },
            error => console.log(error)
          );
          // reenter the Angular zone and display done
          this._ngZone.run(() => { console.log('Outside Done!'); });
     
      });
      }
      else if(  this.producto.idProveedor == 0 && this.producto.nombreProveedor != "" )
      {
        console.log("nuevo proveedor ");
      }
      console.log(this.producto);

 

    }
    
  }

  
   
  validarFormulario()
  {
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
    this.suscription.unsubscribe();
  }

}
