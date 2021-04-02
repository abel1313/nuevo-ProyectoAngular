import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-carrito-detalle',
  templateUrl: './carrito-detalle.component.html',
  styleUrls: ['./carrito-detalle.component.css']
})
export class CarritoDetalleComponent implements OnInit {

  constructor(private serviceFerreteria: ServiceFerreteriaService) { }

  carrito: any = [];
  totalVenta: number = 0;

  validandoTotal: Boolean = false;
  mostrarVenta: Boolean = false;

  suscription: Subscription;

  total: number = 0;
  

  ngOnInit(): void 
  {
    Sessiones.eliminarSessionesReportes('editarMarca');
    this.mostrarCarrito();

  }

  realizarVenta()
  {
    this.mostrarVenta = true;
    this.validandoTotal = true;

  }

  cancelarVenta()
  {
    this.carrito = [];
    this.mostrarVenta = false;
    this.validandoTotal = false;
    this.total = 0;
    sessionStorage.removeItem("carritoventa");
    sessionStorage.removeItem("tamanoCarrito");
    this.serviceFerreteria.serviceDetalle.countProductosCarrito$.emit(0); // si
  }
  regresarCarritoDetalle()
  {
    this.serviceFerreteria.serviceDetalle.verCarritoCompras$.emit(false);
    
  }


  mostrarCarrito()
  {

    // this.totalVenta = 
    // JSON.parse(sessionStorage.getItem("carritoventa")).totalCarrito;
    this.carrito = JSON.parse(sessionStorage.getItem("carritoventa")) != null ? Object.values(JSON.parse(sessionStorage.getItem("carritoventa")))  : [] ;
//  console.log(this.carrito, " session");
    // console.log(Object.keys(this.carrito));  ver los indix de object
    // console.log(Object.keys(this.carrito).length); tamaño del object

    for (const iterator of this.carrito) {
      this.total += (typeof(iterator.subtotal) == 'number') ? ( iterator.precioProducto * iterator.cantidad1 ) : 0;  

    }

    
    this.validandoTotal = (this.total > 0) ? true: false;
    

  }

}
