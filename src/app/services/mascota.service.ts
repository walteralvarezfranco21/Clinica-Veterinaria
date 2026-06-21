import { Injectable } from '@angular/core';
import { Mascota } from '../models/mascota.model';

@Injectable({ providedIn: 'root' })
export class MascotaService {
  private mascotas: Mascota[] = []; 

  registrarMascota(nuevaMascota: Mascota): void {
    this.mascotas.push(nuevaMascota);
  }

  listarInformacion(): string[] {
    return this.mascotas.map(m => m.obtenerDetalles());
  }
}