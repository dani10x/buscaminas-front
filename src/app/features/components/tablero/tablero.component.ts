import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CasillaComponent } from '../casilla/casilla.component';

@Component({
  selector: 'app-tablero',
  imports: [CommonModule, CasillaComponent],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})
export class TableroComponent implements OnInit {

  @Input() filas: number = 10;
  @Input() columnas: number = 10; 

  tablero: any[][] = [];

  ngOnInit(): void {
    this.inicializarTablero();
  }

  public inicializarTablero() {
    this.tablero = Array.from({ length: this.filas }, () =>
      Array.from({ length: this.columnas }, () => ({
        descubierta: false,
        marcada: false,
      }))
    );
  }


  descubrirCasilla(i: number, j: number) {

  }

  marcarCasilla(i: number, j: number) {
    
  }

}
