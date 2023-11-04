import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Interesse } from '../model/Interesse';
import { AlertasService } from '../service/alertas.service';
import { InteresseService } from '../service/interesse.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-post-interesse',
  templateUrl: './post-interesse.component.html',
  styleUrls: ['./post-interesse.component.css']
})
export class PostInteresseComponent implements OnInit {

  interesse: Interesse = new Interesse()
  listaInteresses: Interesse[]

  constructor(
    private interesseService: InteresseService,
    private router: Router,
    private alert: AlertasService
  ) { }

  ngOnInit(): void {
    this.findAllInteresses()
  }

  findAllInteresses(){
    this.interesseService.getAllInteresse().subscribe((resp: Interesse[]) => {
      this.listaInteresses = resp
    })
  }

  findByIdInteresse(){
    this.interesseService.getByIdInteresse(this.interesse.id).subscribe((resp: Interesse) => {
      this.interesse = resp;
    })
  }

  cadastrar(){
    if (this.interesse.nome == null) {
      this.alert.showAlertDanger('Preencha o campo de nome do interesse corretamente')
    } else {
      this.interesseService.postInteresse(this.interesse).subscribe((resp: Interesse) => {
        this.interesse = resp
        this.router.navigate(['/perfil'])
        this.alert.showAlertSuccess('Interesse cadastrado com sucesso!')
      })
    }
  }  

  generatePDF() {
    const interesses = this.listaInteresses.map((item, index) => [index + 1, item.nome]);
  
    const documentDefinition = {
      content: [
        { text: 'Lista de Interesses', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: [30, '*'],
            body: [
              ['Nº', 'Nome do Interesse'],
              ...interesses,
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
  
    pdfMake.createPdf(documentDefinition).download('lista-interesses.pdf');
  }

}
