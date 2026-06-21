import { Injectable } from '@angular/core';

import { HistorialAtencion } from '../models/historial.model';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private atenciones: HistorialAtencion[] = [
    { 
      id: 1, 
      mascotaId: 101, 
      fecha: new Date(), 
      diagnostico: 'Salud estable', 
      tratamiento: 'Vacuna Antirrábica', 
      veterinario: 'Dr. Pérez' 
    },
    { 
      id: 2, 
      mascotaId: 101, 
      fecha: new Date('2025-06-01'), 
      diagnostico: 'Leve deshidratación', 
      tratamiento: 'Consulta General', 
      veterinario: 'Dra. López' 
    }
  ];

  constructor() { }
  obtenerAtenciones(): HistorialAtencion[] {
    return this.atenciones;
  }

  agregarAtencion(atencion: HistorialAtencion): void {
    this.atenciones.push(atencion);
  }
}