import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-post-tema',
  templateUrl: './post-tema.component.html',
  styleUrls: ['./post-tema.component.css']
})
export class PostTemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]
  @ViewChild('myChart') myChartCanvas!: ElementRef;
 
 
  constructor(
    private temaService: TemaService,
    private router: Router,
    private alert: AlertasService
  ) { }

  ngOnInit() {
    this.findAllTemas();
  }

  findAllTemas(){
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.tema.id).subscribe((resp: Tema) => {
      this.tema = resp;
    })
  }

  cadastrar(){
    if (this.tema.descricao == null) {
      this.alert.showAlertDanger('Preencha o campo de nome do tema corretamente')
    } else {
      this.temaService.postTemas(this.tema).subscribe((resp: Tema) => {
        this.tema = resp
        this.router.navigate(['/perfil'])
        this.alert.showAlertSuccess('Tema cadastrado com sucesso!')
      })
    }
  }  

  generatePDF() {
    const themes = this.listaTemas.map((item, index) => [index + 1, item.nome]);
  
    const documentDefinition = {
      content: [
        { text: 'Lista de temas', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: [30, '*'],
            body: [
              ['Nº', 'Nome do Tema'],
              ...themes,
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
        },
      },
    };
  
    pdfMake.createPdf(documentDefinition).download('theme-list.pdf');
  }

  ngAfterViewInit() {
    // Fetch data from your service
    this.temaService.getAllTemas().subscribe((temas: Tema[]) => {
      const labels = temas.map((tema) => tema.nome);
      const data = temas.map((tema) => tema.qnt_posts || 0);

      // Access the canvas element
      const canvas: HTMLCanvasElement = this.myChartCanvas.nativeElement;

      // Create a chart
      const ctx = canvas.getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Number of Posts',
              data: data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
      });
    });
  } 
  
}
