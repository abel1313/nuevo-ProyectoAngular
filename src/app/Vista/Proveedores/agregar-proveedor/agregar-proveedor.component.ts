import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent implements OnInit {
@HostBinding("class") classe = "row"
  constructor() { }

  ngOnInit(): void {
  }

}
