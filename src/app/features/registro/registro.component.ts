import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PacientesService } from '../../services/pacientes.service';
import { CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  esCitaProgramada: boolean = false;

  constructor(
    private fb: FormBuilder,
    private pacientesService: PacientesService,
    private citaService: CitaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.registroForm = this.fb.group({
      nombreDueno: ['', [Validators.required, Validators.minLength(3)]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      telefono: ['', Validators.required],
      nombreMascota: ['', Validators.required],
      especie: ['Perro', Validators.required],
      raza: ['', Validators.required],
      edad: [0, [Validators.required, Validators.min(0)]],
      genero: ['Macho', Validators.required], 
      hora: [''],
      fecha: ['']
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['hora'] && params['fecha']) {
        this.esCitaProgramada = true;
        this.registroForm.patchValue({ 
          hora: params['hora'],
          fecha: params['fecha'] 
        });
      }
    });
  }

  guardarPaciente(): void {
    if (this.registroForm.valid) {
      const formValue = this.registroForm.value;
      const pacienteId = Date.now(); 

      // 1. Registrar paciente en el servicio
      this.pacientesService.agregarPaciente({
        id: pacienteId,
        nombreDueno: formValue.nombreDueno,
        dni: formValue.dni,
        telefono: formValue.telefono,
        nombreMascota: formValue.nombreMascota,
        especie: formValue.especie,
        raza: formValue.raza,
        edad: formValue.edad,
        genero: formValue.genero,
        historial: [] 
      });

      // 2. Registrar cita si el registro viene desde la agenda
      if (this.esCitaProgramada) {
        this.citaService.agregarCita({
          id: Date.now(),
          pacienteId: pacienteId,
          mascotaNombre: formValue.nombreMascota,
          dueno: formValue.nombreDueno,
          tipo: formValue.especie,
          hora: formValue.hora,
          fecha: formValue.fecha,
          estado: 'Pendiente'
        });
      }

      // 3. Redirección inmediata al historial del paciente recién creado
      
      this.router.navigate(['/historial', pacienteId]);
      
    } else {
     
      this.registroForm.markAllAsTouched();
    }
  }
}