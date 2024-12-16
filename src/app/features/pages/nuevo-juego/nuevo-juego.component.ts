import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { WebSocketService } from '../../services/web-socket.service';
import { TableroComponent } from '../../components/tablero/tablero.component';
import { CasillaComponent } from '../../components/casilla/casilla.component';
import { AppComponent } from "../../../app.component";

@Component({
  selector: 'app-nuevo-juego',
  imports: [MatCardModule, MatButtonModule, TableroComponent, CasillaComponent, AppComponent],
  templateUrl: './nuevo-juego.component.html',
  styleUrl: './nuevo-juego.component.css'
})
export class NuevoJuegoComponent implements OnInit {
 
  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.webSocketService.connect().subscribe({
      next: (res) => console.log(res.respuesta),
      error: (error) => console.error(error.respuesta)
    });
  }

  public prueba() {
    this.webSocketService.subscribeToTopic('/user/queue/buscaminas').subscribe((message) => {
      console.log('Component received message: ', message);
    });
  }
}
