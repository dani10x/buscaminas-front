import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CasillaComponent } from '../casilla/casilla.component';
import { WebSocketService } from '../../services/web-socket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Mensaje } from '../../models/Mensaje.model';

@Component({
  selector: 'app-tablero',
  imports: [CommonModule, CasillaComponent],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})
export class TableroComponent implements OnInit {

  @Input() filas: number = 10;
  @Input() columnas: number = 10;
  @Input() idJugador!: string; 

  private _snackBar = inject(MatSnackBar);
  tablero: any[][] = [];

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.inicializarTablero();
    this.subcribirsePartida();
  }

  public inicializarTablero() {
    this.tablero = Array.from({ length: this.filas }, () =>
      Array.from({ length: this.columnas }, () => ({
        descubierta: false,
        marcada: false,
        minasCercanas: 0
      }))
    );
  }

  public descubrirCasilla(i: number, j: number) {
    this.webSocketService.sendMessage('/app/revelar', {x: i, y: j})
  }

  public marcarCasilla(i: number, j: number) {
    this.tablero[i][j].marcada = !this.tablero[i][j].marcada;
  }

  private subcribirsePartida(): void {
    this.webSocketService.subscribeToTopic('/user/queue/buscaminas').subscribe((message) => {
      console.log('Component received message: ', message);
      this.procesarMensaje(message);
    });
    const topic = '/topic/' + this.idJugador + '/queue/notificaciones';
    this.webSocketService.subscribeToTopic(topic).subscribe((message) => {
      console.log('Component received message: ', message);
      this.procesarMensaje(message);
    })
  }

  private procesarMensaje(message: string): void {
    let format = JSON.parse(message);
    console.log(format);
    if(format.respuesta){
      this.notificar(format);
    }
    else if(Array.isArray(format)) {
      this.actualizarCasillas(format);
    }
  }

  private notificar(mensaje: Mensaje) {
    this._snackBar.open(mensaje.respuesta, "", {
      verticalPosition: "top",
      horizontalPosition: "right",
      duration: 3000
    })
  }

  private actualizarCasillas(casillas: Array<any>): void {
    casillas.forEach(casilla => {
      this.tablero[casilla.x][casilla.y].minasCercanas = casilla.numero;
      this.tablero[casilla.x][casilla.y].descubierta = true;
    })
  }

}
