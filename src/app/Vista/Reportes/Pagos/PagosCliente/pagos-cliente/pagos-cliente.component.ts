import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { IDTOPagoReporte } from 'src/app/Model/DTO/DROPagosRepostes/IDTOPagoReporte';
import { DTOVentaPagos } from 'src/app/Model/DTO/DTOVentaPagos/DTOVentaPagos';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';

@Component({
  selector: 'app-pagos-cliente',
  templateUrl: './pagos-cliente.component.html',
  styleUrls: ['./pagos-cliente.component.css']
})
export class PagosClienteComponent implements OnInit {

  @ViewChild('dtsPago') datosPagoCliente: ElementRef;

  
  constructor
  (
    private router: Router, _ngZone: NgZone
  ) { }


  reportePagoCliente: IDTOPagoReporte;

  spinerGenerarReporte: Boolean = false;
 

  ngOnInit(): void 
  {

    Sessiones.eliminarSessionesReportes('editarMarca');
 this.sesionesReportes();
}

sesionesReportes()
{
  this.reportePagoCliente = 
sessionStorage.getItem('iReportePago') != null ?
 JSON.parse(sessionStorage.getItem('iReportePago')): 
 this.router.navigateByUrl('/ventas/buscar') ;



}

  pdf() {
    
    this.spinerGenerarReporte = true;
    this.downloadPdf();
  }
  downloadPdf() {
    const DATA = this.datosPagoCliente.nativeElement;
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
      docResult.save(`${new Date().toISOString()}_Pago.pdf`);
    });
    setTimeout(() => 
    {
      sessionStorage.removeItem('iReportePago');
      this.router.navigateByUrl('ventas/buscar');
      this.spinerGenerarReporte = false;
    }, 2500);
  }

}

