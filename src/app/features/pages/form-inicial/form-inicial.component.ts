import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { WebSocketService } from '../../services/web-socket.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-inicial', // Selector del componente
  templateUrl: './form-inicial.component.html',
  styleUrls: ['./form-inicial.component.css'],
  imports: [MatCardModule, MatFormFieldModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatInputModule, CommonModule],
})
export class FormInicialComponent implements OnInit {
  datosForm!: FormGroup;
  mostrarFormulario = false;
  private idJugador: string = '';


  constructor(
    private fb: FormBuilder,
    private webSocketService: WebSocketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.datosForm = this.fb.group({
      filas: ['', [Validators.required, Validators.min(1)]],
      columnas: ['', [Validators.required, Validators.min(1)]],
      minas: ['', [Validators.required, Validators.min(1)]],
    });
    this.webSocketService.connect().subscribe({
      next: (res) => console.log(res.respuesta),
      error: (error) => console.error(error.respuesta),
    });
  }

  enviarDatos() {
    const filas = this.datosForm.get('filas')?.value;
    const columnas = this.datosForm.get('columnas')?.value;
    const minas = this.datosForm.get('minas')?.value;
    this.router.navigate(['/juego'], { queryParams: { filas: filas, columnas: columnas, minas: minas, idJugador: this.idJugador } });
  }

  public subscibirseBuscaminas() {
    this.webSocketService
      .subscribeToTopic('/user/queue/buscaminas')
      .subscribe((message) => {
        console.log('Component received message: ', message);
        this.procesarMensaje(message);
      });
    this.obtenerIdJugador();
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
      this.mostrarFormulario = true;
    }
  }

  public subsribirseNotificaciones() {
    const topic = '/topic/' + this.idJugador + '/queue/notificaciones';
    this.webSocketService.subscribeToTopic(topic).subscribe((message) => {
      console.log('Component received message: ', message);
      this.procesarMensaje(message);
    });
  }
}
