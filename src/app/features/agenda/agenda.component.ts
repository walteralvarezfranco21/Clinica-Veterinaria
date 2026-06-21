import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CitaService } from '../../services/cita.service';
import { Cita } from '../../models/cita.model';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  citas: Cita[] = [];
  busqueda: string = '';
  horas: string[] = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
    '11:00', '11:30', '12:00', '12:30', '13:00', '14:00',
    '14:30', '15:00', '15:30', '16:00', '16:30', '17:00' 
  ];
  fechaSeleccionada: string = new Date().toISOString().split('T')[0];

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.citaService.citas$.subscribe(citas => {
      this.cargarCitas(citas);
    });
  }

  private formatFecha(fecha: Date | string): string {
    return (fecha instanceof Date) ? fecha.toISOString().split('T')[0] : fecha;
  }

  cargarCitas(todas: Cita[]): void {
    this.citas = todas.filter(cita => this.formatFecha(cita.fecha) === this.fechaSeleccionada);
  }

  get citasFiltradas(): Cita[] {
    if (!this.busqueda.trim()) return this.citas;
    const termino = this.busqueda.toLowerCase();
    return this.citas.filter(c => 
      c.mascotaNombre.toLowerCase().includes(termino) || 
      c.dueno.toLowerCase().includes(termino)
    );
  }

  // Getter para el ordenamiento seguro en el HTML
  get citasOrdenadas(): Cita[] {
    return [...this.citasFiltradas].sort((a, b) => a.hora.localeCompare(b.hora));
  }

  onFechaChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.fechaSeleccionada = input.value;
    this.cargarCitas(this.citaService.obtenerCitas());
  }

  getCitaPorHora(hora: string): Cita | undefined {
    return this.citas.find(cita => cita.hora === hora);
  }

  cancelarCita(id: number): void {
    if (confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
      this.citaService.cancelarCita(id);
    }
  }

  getProximasCitas(): Cita[] {
    return this.citas
      .filter(cita => cita.estado === 'Pendiente')
      .sort((a, b) => a.hora.localeCompare(b.hora))
      .slice(0, 3);
  }
}