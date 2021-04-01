import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { IDTOPagoReporte } from 'src/app/Model/DTO/DROPagosRepostes/IDTOPagoReporte';
import { IDTOPagosServer } from 'src/app/Model/DTO/DROPagosRepostes/IDTOPagosServer';
import { IDTOVentaPago } from 'src/app/Model/DTO/DROPagosRepostes/IDTOVentaPago';


import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-generar-reportes-pagos',
  templateUrl: './generar-reportes-pagos.component.html',
  styleUrls: ['./generar-reportes-pagos.component.css']
})
export class GenerarReportesPagosComponent implements OnInit {
@ViewChild('datosPagos') datosPagos: ElementRef;
  constructor
  (
    private router: Router,
    private render2: Renderer2
  ) { }

  iDTOPagoReporte :IDTOPagosServer;

  tamamp: number;
example:  IDTOVentaPago[]=[];

  ngOnInit(): void 
  {
    this.iDTOPagoReporte = sessionStorage.getItem('generarReportePagos') != null?
    JSON.parse(sessionStorage.getItem('generarReportePagos')):
    this.router.navigateByUrl('reportes/generarreportes'); 

    this.tamamp = this.iDTOPagoReporte.listaPagos.length +1 ;

    this.example = this.iDTOPagoReporte.listaPagos;
    
    console.log(this.tamamp);
  }

  pdf2() {

    
    this.downloadPdf();
  }
  downloadPdf() {
    const DATA = (this.datosPagos.nativeElement);
    const doc = new jsPDF('p', 'pt', 'letter');
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
      docResult.save(`${new Date().toISOString()}_Pagos.pdf`);
    });
  }

}
