import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  termino:string      = '';
  hayError:boolean    = false;
  terminoError:string = '';
  capitales:Country[]      = []

  constructor( private paisService: PaisService ) { }

  buscar( termino: string){
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarCapital(this.termino)
      .subscribe( res => {
        this.capitales = res
        console.log(res)
    }, (err) => {
      this.hayError = true
      this.capitales = []
    })
    this.terminoError = this.termino
    this.termino = '';
  }

  sugerencias( termino: string) {
    this.hayError = false
  }
}
