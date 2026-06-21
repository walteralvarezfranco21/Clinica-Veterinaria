// cita.model.ts

export abstract class Cita {
  constructor(
    public id: number,
    public fecha: Date | string,
    public hora: string,
    public mascotaNombre: string,
    public estado: 'Pendiente' | 'Confirmada' | 'Completada' | 'Cancelada',
    public tipo: 'Perro' | 'Gato', 
    public dueno: string,
    public pacienteId: number 
  ) {}

  abstract obtenerDetalles(): string;
}

// Clase hija
export class CitaConsulta extends Cita {
  constructor(
    id: number,
    fecha: Date | string,
    hora: string,
    mascotaNombre: string,
    estado: 'Pendiente' | 'Confirmada' | 'Completada' | 'Cancelada',
    tipo: 'Perro' | 'Gato',
    dueno: string,
    public motivo: string,
    pacienteId: number
  ) {
    super(id, fecha, hora, mascotaNombre, estado, tipo, dueno, pacienteId);
  }

  obtenerDetalles(): string {
    return `Consulta: ${this.motivo}`;
  }
}