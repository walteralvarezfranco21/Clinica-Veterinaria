import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private pacientes = new BehaviorSubject<any[]>([]);
  pacientes$ = this.pacientes.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.inicializarDatos();
    }
  }

  private inicializarDatos() {
    const guardados = localStorage.getItem('pacientes_vet');
    
    if (!guardados) {
      const datosIniciales = [
        { 
          id: 1, nombreDueno: 'Juan Pérez', dni: '12345678', telefono: '999888777', 
          nombreMascota: 'FIRULAIS', especie: 'Perro', raza: 'Criollo', edad: 3, genero: 'Macho',
          historial: [
            { fecha: '2026-03-10', tipo: 'Análisis de Sangre', detalle: 'Resultados normales', peso: '12.0 kg', atendidoPor: 'Dra. Elena Ruiz' },
            { fecha: '2026-05-15', tipo: 'Cirugía', detalle: 'Esterilización exitosa', peso: '12.2 kg', atendidoPor: 'Dr. Torres' },
            { fecha: '2026-06-20', tipo: 'Consulta General', detalle: 'Vacunación al día', peso: '12.5 kg', atendidoPor: 'Dr. López' }
          ]
        },
        { 
          id: 2, nombreDueno: 'María Lopez', dni: '87654321', telefono: '912345678', 
          nombreMascota: 'NALA', especie: 'Perro', raza: 'Labrador', edad: 2, genero: 'Hembra',
          historial: [
            { fecha: '2026-02-20', tipo: 'Desparasitación', detalle: 'Aplicación anual', peso: '25.0 kg', atendidoPor: 'Dra. Elena Ruiz' },
            { fecha: '2026-06-20', tipo: 'Consulta', detalle: 'Revisión preventiva', peso: '25.5 kg', atendidoPor: 'Dr. López' }
          ]
        },
        { 
          id: 3, nombreDueno: 'Juan Gomez', dni: '11223344', telefono: '987654321', 
          nombreMascota: 'THOR', especie: 'Gato', raza: 'Siamés', edad: 4, genero: 'Macho',
          historial: [
            { fecha: '2026-01-10', tipo: 'Consulta Médica', detalle: 'Vómitos leves, dieta blanda', peso: '4.2 kg', atendidoPor: 'Dr. Torres' },
            { fecha: '2026-04-05', tipo: 'Visita General', detalle: 'Refuerzo de vacuna', peso: '4.5 kg', atendidoPor: 'Dra. Elena Ruiz' }
          ]
        }
      ];
      this.pacientes.next(datosIniciales);
      this.guardarEnLocalStorage(datosIniciales);
    } else {
      this.pacientes.next(JSON.parse(guardados));
    }
  }

  agregarPaciente(paciente: any) {
    if (isPlatformBrowser(this.platformId)) {
      const actuales = this.pacientes.value;
      const nuevoPaciente = { ...paciente, id: Date.now(), historial: [] };
      const actualizados = [...actuales, nuevoPaciente];
      this.pacientes.next(actualizados);
      this.guardarEnLocalStorage(actualizados);
    }
  }

  eliminarPaciente(id: number) {
    if (isPlatformBrowser(this.platformId)) {
      const actuales = this.pacientes.value;
      const filtrados = actuales.filter(p => p.id !== id);
      this.pacientes.next(filtrados);
      this.guardarEnLocalStorage(filtrados);
    }
  }

  private guardarEnLocalStorage(pacientes: any[]) {
    localStorage.setItem('pacientes_vet', JSON.stringify(pacientes));
  }
}