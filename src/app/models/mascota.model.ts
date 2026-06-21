// Clase base abstracta 
export abstract class EntidadBase {
  constructor(public id: number) {}
  abstract obtenerDetalles(): string;
}

// Clase Mascota que hereda de EntidadBase (Herencia)
export class Mascota extends EntidadBase {
  constructor(
    id: number,
    public nombre: string,
    public especie: string,
    public raza: string,
    public edad: number
  ) {
    super(id); 
  }

  // Implementación del método (Polimorfismo)
  obtenerDetalles(): string {
    return `${this.nombre} - ${this.especie} (${this.raza})`;
  }
}