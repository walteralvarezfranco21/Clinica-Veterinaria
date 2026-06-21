# 🐾 Agenda Veterinaria - Sistema de Gestión de Citas

Sistema web profesional desarrollado con **Angular** para la optimización de flujos de trabajo en clínicas veterinarias. Esta aplicación permite la gestión centralizada de citas, seguimiento de pacientes y control de la agenda diaria en tiempo real.

## 🚀 Características Principales

* **Centro de Control:** Visualización interactiva de la agenda del día con soporte para múltiples franjas horarias.
* **Gestión Inteligente:** Creación y cancelación de citas con actualización de estados en tiempo real.
* **Búsqueda Avanzada:** Filtros dinámicos por nombre de mascota y propietario.
* **Línea de Tiempo:** Seguimiento cronológico visual de las actividades programadas.
* **Resumen de Gestión:** Estadísticas rápidas y acceso a las próximas tres citas pendientes.
* **Interfaz Responsiva:** Diseño limpio, intuitivo y adaptado para dispositivos móviles.

## 🛠 Tecnologías Utilizadas

* **Frontend:** Angular (Standalone Components).
* **UI/UX:** Bootstrap 5 & CSS3.
* **Iconografía:** Bootstrap Icons.
* **Lógica:** TypeScript & RxJS para el manejo de estados reactivos.

## 📂 Estructura del Proyecto

```text
src/app/
├── features/       # Componentes de funcionalidad (Agenda, Historial, Registro)
├── models/         # Definición de interfaces de datos (Cita, Mascota, Historial)
├── services/       # Gestión centralizada de datos (Servicios de Cita, Mascota, Paciente)
└── shared/         # Elementos reutilizables (Pipes, Directivas)
🏗 Instalación y Ejecución
Para correr el proyecto en tu entorno local, asegúrate de tener instalado Node.js.

Clonar el repositorio:

Bash
git clone [https://github.com/TU_USUARIO/clinica-veterinaria.git](https://github.com/TU_USUARIO/clinica-veterinaria.git)
cd clinica-veterinaria
Instalar dependencias:

Bash
npm install
Ejecutar el servidor:

Bash
ng serve
Accede a http://localhost:4200/ en tu navegador.

💡 Aspectos Técnicos Destacados
Arquitectura: Implementación de Standalone Components para un código más modular y eficiente.

Reactividad: Uso de Observables para que la interfaz se actualice automáticamente al modificar cualquier dato (cancelaciones, nuevas citas).

Diseño CSS: Implementación de contenedores con scroll independiente para mantener la navegación fija y mejorar la UX.