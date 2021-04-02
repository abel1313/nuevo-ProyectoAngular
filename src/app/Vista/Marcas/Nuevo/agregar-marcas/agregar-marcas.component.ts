import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IMarca } from 'src/app/Model/Marcas/IMarca';
import { IMarcas } from 'src/app/Model/Marcas/IMarcas';
import { Marcas } from 'src/app/Model/Marcas/Marcas';
import { IProveedor } from 'src/app/Model/Proveedores/IProveedor';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-agregar-marcas',
  templateUrl: './agregar-marcas.component.html',
  styleUrls: ['./agregar-marcas.component.css']
})
export class AgregarMarcasComponent implements OnInit {

  constructor
  (
    private serviceFerreteria: ServiceFerreteriaService , 
    private _ngZone: NgZone,
    private router: Router
    
     ) { }

  keyword = 'nombreProveedor';
  keywordCategoria = 'nombreCategoria';
  suscription: Subscription;
  marca: IMarcas;

  mensaje: Boolean = false;
  spinner: Boolean = false;

  mar = new Marcas();

  datosProveedores: any = [];

datosProveedor$: Observable<IProveedor[]>;
marcas$: Observable<IMarcas>;


profileForm = new FormGroup({
  nombreMarca: new FormControl('', [Validators.required, Validators.minLength(3)]),
  proveedor: new FormControl('', [Validators.required ]),
});

  ngOnInit(): void 
  {
    this.getDataProveedores();
  }



  onSubmit( e: any )
  {
    e.preventDefault();
    if( !this.profileForm.get('nombreMarca').invalid && !this.profileForm.get('proveedor').invalid )
    {
      this.spinner = true;
        let nombreMarca = this.profileForm.get('nombreMarca').value;
        let idProveedor = (this.profileForm.get('proveedor').value).id;

  this.mar.marcas.nombreMarca = nombreMarca;
  this.mar.marcas.proveedores.id = idProveedor;

      this._ngZone.runOutsideAngular(()=>
      {
        this.marcas$ = this.serviceFerreteria.servicemarca.guardarMarca( this.mar.marcas );
        this.marcas$.subscribe
        (
          ( res: IMarcas )=>
          {
            this._ngZone.run(()=>
            {
              setTimeout(() => {
                this.spinner = false;
                this.mensaje = true;
              }, 2000);
             
              setTimeout(() => {
                  this.profileForm.get('nombreMarca').setValue('');
                  (this.profileForm.get('proveedor').setValue(''));
                this.mensaje = false;
              }, 3500);
            })
          },err =>console.error(err)
          
        );
      });
    
  
    }
    
  }

  getDataProveedores(): void
  {
    this.datosProveedor$ =  this.serviceFerreteria.serviceProveedor.obtenerProveedoresMarcas();
  }
  selectEvent(item: any) {
    // do something with selected item


  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e: any){
    // do something when input is focused
  }

}
