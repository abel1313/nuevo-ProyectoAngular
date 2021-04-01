import { Component, OnInit } from '@angular/core';


import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { IDTOPagoReporte } from 'src/app/Model/DTO/DROPagosRepostes/IDTOPagoReporte';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reporte-pago',
  templateUrl: './reporte-pago.component.html',
  styleUrls: ['./reporte-pago.component.css']
})
export class ReportePagoComponent implements OnInit {

  constructor
  (
    private router: Router
  ) { }

  dtoPagoReporte: IDTOPagoReporte;
 

  ngOnInit(): void 
  {
this.dtoPagoReporte = sessionStorage.getItem('iReportePago') != null ?
 JSON.parse(sessionStorage.getItem('iReportePago')): this.router.navigateByUrl('/ventas/buscar') ;

 
}

  pdf() {
    console.log("diste");
    this.downloadPdf();
  }
  downloadPdf() {
    const DATA = document.getElementById('htmlData');
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
      docResult.save(`${new Date().toISOString()}_${this.dtoPagoReporte.nombreCliente}.pdf`);
    });
  }

}
