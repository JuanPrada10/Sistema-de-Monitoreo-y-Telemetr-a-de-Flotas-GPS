# Sistema de Monitoreo y Telemetría de Flotas GPS

Prototipo funcional de un sistema de telemetría GPS desarrollado como prueba técnica para el rol de Fullstack Developer.

---

## Levantar Proyecto

### 1. Base de datos

```bash
docker-compose up -d
```

### 2. Backend

```bash
cd backend
pnpm install
pnpm run start:dev
```

### 3. Frontend

```bash
cd frontend
pnpm install
pnpm run dev
```

> La API corre en `http://localhost:3000` y el frontend en `http://localhost:5173`

---

## Arquitectura

### Backend — NestJS

Decidi utilizar NestJS ademas por la familiaridad,
por su arquitectura modular permite separar responsabilidades
desde el inicio de forma natural. Su sistema de validacion declarativo
con class-validator resuelve limpiamente las validaciones de los
endpoints sin logica adicional en los controladores.

### Base de datos — PostgreSQL

Decidi optar por una base de datos relacional en este caso Postgres
por la facilidad que da al momento de hacer querys personalizadas ademas
por el hecho de poder aplicar una eliminacion en cascada que se da gracias
a la relacion entre tablas.

### Frontend — React + Tailwind

Decidi usar react ya que es tengo mucha mas familiaridad con esta libreria
y preferi el modelo de componentes que conlleva usar este antes que usar Vanilla JS que
complicaria mucho mas las cosas, esto mas Tailwind que agiliza los estilos.

---

##  Endpoints

| Método   | Ruta            | Descripción                             |
| -------- | --------------- | --------------------------------------- |
| `POST`   | `/gps`          | Ingesta de coordenada GPS               |
| `GET`    | `/vehicles`     | Lista todos los vehículos con su estado |
| `GET`    | `/vehicles/:id` | Detalle de un vehículo específico       |
| `DELETE` | `/vehicles/:id` | Elimina un vehículo y su historial      |

### Lógica de estados

| Estado        | Condición                                        |
| ------------- | ------------------------------------------------ |
| En movimiento | Coordenadas recibidas en los últimos 60 segundos |
| Detenido      | Sin nuevas coordenadas entre 1 y 2 minutos       |
| Sin señal     | Sin datos hace más de 2 minutos                  |

---

## Reflexión — Eliminación de vehículos con caché y base de datos

> _Pregunta de la sección 03.1 D_

Si el sistema contara con Redis como cache y PostgreSQL como base de datos persistente,
La forma correcta de manejarlo en mi opinion se deberia garantizar la correcta eliminacion
tanto en la base de datos como en el cache, ya que al eliminarlo en la base de datos pero no
en el cache se estarian mostrando vehiculos que ya no hacen parte del programa y viceversamente
en el caso que se elimine en el cache pero no el la base de datos no se estaria eliminado realmente,
por lo que en conclusion la mejor opcion seria validar la perfecta sincronia entre ambos primero elimindando
en la base de datos y luego invalidado en el cache.
.

---

## Reporte de IA

### 1. ¿Que herramientas use?

- **Claude** — consultas de arquitectura, diseño de entidades y lógica de negocio
- **OpenCode** — decisiones técnicas durante el desarrollo y revisión de código
- **Stitch** — diseño visual de la interfaz de usuario

### 2. ¿Para que tareas me apoye en la IA?

- Definición de la estructura de módulos de NestJS
- Diseño del esquema de base de datos
- Generación de rutas simuladas para el simulador de telemetría
- Prototipo visual del dashboard en Stitch antes de implementarlo en React

### 3. ¿Qué error de la IA encontre y como lo corregi?

La IA me recomendaba soluciones con mayor complejidad de la necesaria para la solucion de la prueba.
En el backend me recomendo crear mas entidades y modulos de los que el problema lo requeria complicando un poco la solucion.
En el frontend me recomendo utilizar Screaming Arquitecture, una arquitectura que cobra sentido cuando el proyecto es muy grande,
pero para un prototipo me parecio que era over-engineering por lo cual decidi optar por la solucion mas simple que resolviera el problema.

---

## Video de sustentación

---
