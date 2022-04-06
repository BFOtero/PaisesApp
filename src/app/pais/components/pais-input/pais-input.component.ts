import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';


@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit{

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject();

  @Input() placeHolderTermino: string = ''
  @Input() tituloPagina: string = ''  
  @Input() paises: Country[] = []  

  termino: string = ''

  ngOnInit(): void {
   this.debouncer
    .pipe(debounceTime(300))
    .subscribe(( valor => {
      this.onDebounce.emit(valor)
    })) 
  }

  buscar(){
    this.onEnter.emit( this.termino );
  }

  teclaPresionada( event: any) { 
    const valor = event.target.value;
    this.debouncer.next(valor)
  }


}
