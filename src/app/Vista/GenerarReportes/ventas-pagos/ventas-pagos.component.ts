import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Observable } from 'rxjs';
import { IDTOPagosServer } from 'src/app/Model/DTO/DROPagosRepostes/IDTOPagosServer';
import { IDTOVentaPago } from 'src/app/Model/DTO/DROPagosRepostes/IDTOVentaPago';

@Component({
  selector: 'app-ventas-pagos',
  templateUrl: './ventas-pagos.component.html',
  styleUrls: ['./ventas-pagos.component.css']
})
export class VentasPagosComponent implements OnInit {
@ViewChild('datosPagos') datosPagos: ElementRef;
  datosPagosPagosCliente: IDTOPagosServer;

  example: IDTOVentaPago [] = [];

  spinnerReporte: Boolean = false;

  constructor
  (
    private router: Router
  ) { }

  ngOnInit(): void 
  {
this.obtenerDatosPagosCliente();
  }
  obtenerDatosPagosCliente()
  {
    this.datosPagosPagosCliente = sessionStorage.getItem('generarReportePagos') != null ?
    JSON.parse(sessionStorage.getItem('generarReportePagos')) : null ;

    this.example = this.datosPagosPagosCliente.listaPagos;
  }


  pdf() {
    this.spinnerReporte = true;
    this.downloadPdf();
  }
  downloadPdf() {
    const DATA = this.datosPagos.nativeElement;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_pagos.pdf`);
    });

    setTimeout(() => {
      this.spinnerReporte = false;
this.sessionEliminar('generarReportePagos');
this.sessionEliminar('reportePagoCliente');
this.router.navigateByUrl('ventas/buscar');
    }, 3000);
  }


  cancelarReportePagos() {
    this.sessionEliminar('sesionPagos');
    this.sessionEliminar('reportePagoCliente');
    this.router.navigateByUrl('ventas/buscar');
  }

  sessionEliminar( nombre: string )
  {
    if( sessionStorage.getItem( nombre ) != null )
    {
      sessionStorage.removeItem( nombre );
    }
  }
  

}
