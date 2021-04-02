import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IMarcas } from 'src/app/Model/Marcas/IMarcas';
import { Marcas } from 'src/app/Model/Marcas/Marcas';
import { IProveedor } from 'src/app/Model/Proveedores/IProveedor';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-editar-marca',
  templateUrl: './editar-marca.component.html',
  styleUrls: ['./editar-marca.component.css']
})
export class EditarMarcaComponent implements OnInit {

  constructor
    (
      private serviceFerreteria: ServiceFerreteriaService,
      private _ngZone: NgZone,
      private router: Router,
      private fb: FormBuilder

    ) { }

  keyword = 'nombreProveedor';
  keywordCategoria = 'nombreCategoria';
  marca: IMarcas;

  mensaje: Boolean = false;
  spinner: Boolean = false;

  mar = new Marcas();

  datosProveedores: any = [];

  datosProveedor$: Observable<IProveedor[]>;
  marcas$: Observable<IMarcas>;

  marcax: IMarcas;

formEditar: FormGroup;


  profileForm = new FormGroup({
    nombreMarca: new FormControl('', [Validators.required, Validators.minLength(3)]),
    proveedor: new FormControl('', [Validators.required]),
  });

 

  ngOnInit(): void {

    this.getDataProveedores();
  let marcae: IMarcas = 
  sessionStorage.getItem('editarMarca') != null ?
   JSON.parse(sessionStorage.getItem('editarMarca')) : 
   this.router.navigateByUrl('marcas/nuevo');

    this.obtenerDatosEditar();

    this.formEditar = this.fb.group
    ({
     nombreMarca: new FormControl( marcae.nombreMarca , [Validators.required, Validators.minLength(3)]),
     proveedor: new FormControl( marcae.proveedores.nombreProveedor , [Validators.required])
    });
  }

  obtenerDatosEditar() 
  {
this.marcas$ = this.serviceFerreteria.servicemarca.marcas$;
this.marcas$.subscribe
(
  ( marca: IMarcas )=>
  {

    this.formEditar.get('nombreMarca').setValue("gola");
    this.marcax = marca;
    console.log(marca, this.marcax, " marcas sus");
  }
);


  }

  onSubmit(e: any) {
    e.preventDefault();
    //   if( !this.profileForm.get('nombreMarca').invalid && !this.profileForm.get('proveedor').invalid )
    //   {
    //     this.spinner = true;
    //       let nombreMarca = this.profileForm.get('nombreMarca').value;
    //       let idProveedor = (this.profileForm.get('proveedor').value).id;

    // this.mar.marcas.nombreMarca = nombreMarca;
    // this.mar.marcas.proveedores.id = idProveedor;

    //     this._ngZone.runOutsideAngular(()=>
    //     {
    //       this.marcas$ = this.serviceFerreteria.servicemarca.guardarMarca( this.mar.marcas );
    //       this.marcas$.subscribe
    //       (
    //         ( res: IMarcas )=>
    //         {
    //           this._ngZone.run(()=>
    //           {
    //             setTimeout(() => {
    //               this.spinner = false;
    //               this.mensaje = true;
    //             }, 2000);

    //             setTimeout(() => {
    //                 this.profileForm.get('nombreMarca').setValue('');
    //                 (this.profileForm.get('proveedor').setValue(''));
    //               this.mensaje = false;
    //             }, 3500);
    //           })
    //         },err =>console.error(err)

    //       );
    //     });


    //   }

  }


  getDataProveedores(): void {
    this.datosProveedor$ = this.serviceFerreteria.serviceProveedor.obtenerProveedoresMarcas();
  }
  selectEvent(item: any) {
    // do something with selected item


  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something when input is focused
  }

}
