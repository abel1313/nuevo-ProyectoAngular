import { Component, OnInit } from '@angular/core';


import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { IReporteVenta } from 'src/app/Model/Reportes/IReporteVenta';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';


@Component({
  selector: 'app-generar-reportes-ventas',
  templateUrl: './generar-reportes-ventas.component.html',
  styleUrls: ['./generar-reportes-ventas.component.css']
})
export class GenerarReportesVentasComponent implements OnInit {

  constructor
  (
    private router: Router
  ) { }


  reporteVenta: IReporteVenta [] = [];

  spinerGenerarReporte: Boolean = false;
 

  ngOnInit(): void 
  {


 this.sesionesReportes();
}

sesionesReportes()
{
  this.reporteVenta = 
sessionStorage.getItem('reporteVenta') != null ?
 JSON.parse(sessionStorage.getItem('reporteVenta')): 
 this.router.navigateByUrl('/ventas/buscar') ;

//  this.reporteVenta = 
//  sessionStorage.getItem('reporteVenta') != null ?
//   JSON.parse(sessionStorage.getItem('reporteVenta')): 
//   this.router.navigateByUrl('/ventas/buscar') ;

}

  pdf() {
    
    this.spinerGenerarReporte = true;
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
      docResult.save(`${new Date().toISOString()}_Ventas.pdf`);
    });
    setTimeout(() => 
    {
      this.spinerGenerarReporte = false;
    }, 2500);
  }

}
