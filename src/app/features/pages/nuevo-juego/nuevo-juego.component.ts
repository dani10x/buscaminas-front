import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { WebSocketService } from '../../services/web-socket.service';
import { TableroComponent } from '../../components/tablero/tablero.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-juego',
  imports: [
    MatCardModule,
    MatButtonModule,
    TableroComponent,
  ],
  templateUrl: './nuevo-juego.component.html',
  styleUrl: './nuevo-juego.component.css',
})
export class NuevoJuegoComponent implements OnInit {

  idJugador: string = '';
  filas!: number;
  columnas!: number;
  minas!: number;
  @ViewChild(TableroComponent) tablero!: TableroComponent;

  constructor(
    private webSocketService: WebSocketService,
    private route: ActivatedRoute,
    private router: Router
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

  public reiniciarJuego() {
    this.webSocketService.sendMessage('/app/reiniciar', {});
    this.webSocketService.disconnect().subscribe({
      next: (res) => this.router.navigateByUrl('/inicio'),
      error: (e) => console.error(e),
    });
  }

  public resolverJuego() {
    this.tablero.resolverJuego();
  }
}
