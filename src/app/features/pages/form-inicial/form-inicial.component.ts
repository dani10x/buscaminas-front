import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-form-inicial', // Selector del componente
  templateUrl: './form-inicial.component.html',
  styleUrls: ['./form-inicial.component.scss'],
  imports: [MatCardModule, MatFormFieldModule]
})
export class FormInicialComponent implements OnInit {
  datosForm!: FormGroup; 
  loading = false;     

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.datosForm = this.fb.group({
      filas: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],    
      columnas: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],  
      minas: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]      
    });
  }

  enviarDatos(){
    
  }

}
