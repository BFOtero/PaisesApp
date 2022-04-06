import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Country, Translation } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  badges: Translation[] = [];

  constructor(
    private activatedRouter: ActivatedRoute,
    private paisService: PaisService
  ) { }

  ngOnInit(): void {

    this.activatedRouter.params
      .pipe(
        switchMap( ({ id })=> this.paisService.getPaisPorCodigo( id )), 
        tap(console.log)
      )
      .subscribe( response => {
        this.pais = response[0]
        const {translations} = this.pais;
        this.badges = Object.values(translations);
        console.log(this.badges.slice(0, 10))
        
      })


    // this.activatedRouter.params
    //   .subscribe( ({id}) => {
    //     this.paisService.getPaisPorCodigo( id )
    //       .subscribe( pais => {
    //         console.log(pais)
    //       })
    //   })
  }

}
