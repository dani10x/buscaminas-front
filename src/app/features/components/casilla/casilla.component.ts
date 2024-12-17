import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-casilla',
  imports: [MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './casilla.component.html',
  styleUrl: './casilla.component.css'
})
export class CasillaComponent {
  @Input() descubierta = false;
  @Input() minasCercanas: number = 0;
  @Input() marcada = false;
  @Input() mina = false;

  @Output() casillaDescubierta = new EventEmitter<void>();
  @Output() casillaMarcada = new EventEmitter<void>();

  descubrir() {
    if (!this.descubierta && !this.marcada) {
      this.casillaDescubierta.emit();
    }
  }

  marcar(event: MouseEvent) {
    event.preventDefault(); 
    if (!this.descubierta) {
      this.casillaMarcada.emit();
    }
  }
}
