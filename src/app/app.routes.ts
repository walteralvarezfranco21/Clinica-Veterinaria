import { Routes } from '@angular/router';
import { AgendaComponent } from './features/agenda/agenda.component';
import { RegistroComponent } from './features/registro/registro.component';
import { HistorialComponent } from './features/historial/historial.component';
import { NuevaCitaProgramadaComponent } from './features/nueva-cita/nueva-cita-programada/nueva-cita-programada.component';

export const routes: Routes = [
  // Ruta por defecto: redirige a la agenda
  { path: '', redirectTo: 'agenda', pathMatch: 'full' },
  
  // Rutas de tus características (Features)
  { path: 'agenda', component: AgendaComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'historial/:id', component: HistorialComponent },
  { path: 'nueva-cita-programada', component: NuevaCitaProgramadaComponent },
  { path: '**', redirectTo: 'agenda' }
];