import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent {

  termino:string      = '';
  hayError:boolean    = false;
  terminoError:string = '';
  paises:Country[]      = []
  paisesSugeridos: Country[] = []
  mostrarSug: boolean = false
  constructor( private paisService: PaisService ) { }

  buscar( termino: string){
    this.mostrarSug = false
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarPais(this.termino)
      .subscribe( res => {
        this.paises = res
        console.log(res)
    }, (err) => {
      this.hayError = true
      this.paises = []
    })
    this.terminoError = this.termino
    
  }

  sugerencias( termino: string) {
    this.mostrarSug = true;
    this.hayError = false;
    this.termino = termino
    this.paisService.buscarPais( termino )
      .pipe(
        tap(console.log)
      )
      .subscribe( paises => this.paisesSugeridos = paises.splice(0,3) );
  }

  buscarSugerido( termino:string ){ 
    this.buscar(termino)
  }

}

