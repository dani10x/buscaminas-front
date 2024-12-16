import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketService } from './features/services/web-socket.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, RouterModule, MatSidenavModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'minesweeper-front';

  constructor(private webSocketClient: WebSocketService) {}

  public prueba() {
    console.log("hola");
    this.webSocketClient.connect();
  }
}
