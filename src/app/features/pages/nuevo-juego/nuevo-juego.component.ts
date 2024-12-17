import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { WebSocketService } from '../../services/web-socket.service';
import { TableroComponent } from '../../components/tablero/tablero.component';
import { CasillaComponent } from '../../components/casilla/casilla.component';
import { AppComponent } from '../../../app.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nuevo-juego',
  imports: [
    MatCardModule,
    MatButtonModule,
    TableroComponent,
    CasillaComponent,
    AppComponent,
  ],
  templateUrl: './nuevo-juego.component.html',
  styleUrl: './nuevo-juego.component.css',
})
export class NuevoJuegoComponent implements OnInit {

  idJugador: string = '';
  filas!: number;
  columnas!: number;
  minas!: number;

  constructor(
    private webSocketService: WebSocketService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      let filas = params.get('filas');
      let columnas = params.get('columnas');
      let minas = params.get('minas');
      let idJugador = params.get('idJugador');
      if(filas) {
        this.filas = Number.parseInt(filas);
      }
      if(columnas) {
        this.columnas = Number.parseInt(columnas);
      }
      if(minas) {
        this.minas = Number.parseInt(minas);
      }
      if(idJugador) {
        this.idJugador = idJugador;
      }
    });
    this.webSocketService.sendMessage('/app/nuevo', {filas: this.filas, columnas: this.columnas, minas: this.minas});
  }

  /*public subscibirseBuscaminas() {
    this.webSocketService
      .subscribeToTopic('/user/queue/buscaminas')
      .subscribe((message) => {
        console.log('Component received message: ', message);
        this.procesarMensaje(message);
      });
  }

  public obtenerIdJugador() {
    this.webSocketService.sendMessage('/app/iniciar', {});
  }

  private procesarMensaje(message: string): void {
    let format = JSON.parse(message);
    console.log(format);
    if (format.idUsuario) {
      this.idJugador = format.idUsuario;
      this.subsribirseNotificaciones();
    }
  }

  public subsribirseNotificaciones() {
    const topic = '/topic/' + this.idJugador + '/queue/notificaciones';
    this.webSocketService.subscribeToTopic(topic).subscribe((message) => {
      console.log('Component received message: ', message);
      this.procesarMensaje(message);
    });
  }*/
}
