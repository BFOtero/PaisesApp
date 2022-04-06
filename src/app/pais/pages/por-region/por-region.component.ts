import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
  ]
})
export class PorRegionComponent  {

  listaRegiones: string[] = ['africa', 'americas', 'asia','europe', 'oceania'];
  regiones: Country[] = [];
  hayError:boolean    = false;
  regionActiva: string = '';

  constructor( private paisService: PaisService) { }

  activarRegion( region:string ) {
    this.regionActiva = region
    this.paisService.buscarRegion( region ).subscribe((res) => {
      this.regiones = res
      console.log(res)
    },
    error => {
      this.hayError = true;
      console.log(error)
    });
  }

}
