import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoCita',
  standalone: true
})
export class EstadoCitaPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'Pendiente': return '⌛ Pendiente';
      case 'Confirmada': return '✅ Confirmada';
      case 'Completada': return '✔ Completada';
      default: return value;
    }
  }
}