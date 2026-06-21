import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PacientesService } from '../../services/pacientes.service';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './historial.component.html'
})
export class HistorialComponent implements OnInit, OnDestroy {
  modoGeneral: boolean = true;
  mascotaSeleccionada: any = null;
  listaPacientes: any[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pacientesService: PacientesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      combineLatest([
        this.pacientesService.pacientes$,
        this.route.paramMap
      ]).subscribe(([datos, params]) => {
        this.listaPacientes = datos;
        const id = params.get('id');

        if (id) {
          this.modoGeneral = false;
          // Buscamos al paciente. Usamos toString() para asegurar comparaciones correctas
          const encontrado = this.listaPacientes.find(m => m.id.toString() === id.toString());
          
          if (encontrado) {
            this.mascotaSeleccionada = encontrado;
          } else {
            // Si el ID no existe (ej. fue eliminado), redirigimos a la lista general
            this.router.navigate(['/historial']);
          }
        } else {
          this.modoGeneral = true;
          this.mascotaSeleccionada = null;
        }
        
        // Forzamos la detección de cambios para evitar errores de vista en SSR
        this.cdr.detectChanges();
      })
    );
  }

  eliminarRegistro(id: number): void {
    const confirmacion = confirm("¿Está totalmente seguro de eliminar este historial? Esta acción no se puede deshacer.");
    
    if (confirmacion) {
      this.pacientesService.eliminarPaciente(id);
      this.router.navigate(['/historial']);
    }
  }

  ngOnDestroy(): void {
    // Limpiamos suscripciones para evitar fugas de memoria
    this.subscriptions.unsubscribe();
  }
}