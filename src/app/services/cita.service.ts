import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cita, CitaConsulta } from '../models/cita.model';

@Injectable({ providedIn: 'root' })
export class CitaService {
  private citasSource = new BehaviorSubject<Cita[]>([
    new CitaConsulta(1, new Date(), '09:00', 'Firulais', 'Confirmada', 'Perro', 'Juan Pérez', 'Vacunación', 1),
    new CitaConsulta(2, new Date(), '11:00', 'Nala', 'Pendiente', 'Perro', 'Maria Lopez', 'Consulta General', 2),
    new CitaConsulta(3, new Date(), '12:00', 'Thor', 'Pendiente', 'Gato', 'Juan Gomez', 'Consulta General', 3)
  ]);

  citas$ = this.citasSource.asObservable();

  obtenerCitas(): Cita[] {
    return this.citasSource.value;
  }

  
  agregarCita(nuevaCita: any) {
    const citasActuales = this.citasSource.value;
    
    
    const citaConId = {
      ...nuevaCita,
      id: nuevaCita.id || Date.now(),
      pacienteId: nuevaCita.pacienteId 
    };

    this.citasSource.next([...citasActuales, citaConId]);
  }

  // Método para cancelar/eliminar
  cancelarCita(id: number): void {
    const citasActualizadas = this.citasSource.value.filter(c => c.id !== id);
    this.citasSource.next(citasActualizadas);
  }

  getResumenCitas(): string[] {
    return this.citasSource.value.map(cita => cita.obtenerDetalles());
  }
}