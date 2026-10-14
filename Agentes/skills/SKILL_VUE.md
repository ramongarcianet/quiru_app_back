---
name: vue-data-list-screen
description: Crear o actualizar pantallas en Vue 3 para mostrar listados de datos con origen local en JSON o datos mock, filtro de texto, botón de búsqueda y acceso desde el menú principal o navegación existente. Usar cuando se necesite montar vistas administrativas, tablas simples, prototipos funcionales o módulos internos de consulta dentro de una app Vue.
---

# Vue Data List Screen

## Overview

Construir una pantalla de listado en Vue 3 con Composition API y `script setup`, manteniendo la solución simple, legible y fácil de reemplazar luego por una API real.

Priorizar componentes pequeños, estado local claro y una integración respetuosa con la navegación ya existente.

## Quick Start

1. Identificar cómo navega la app hoy: router, tabs internas, layout principal o menú con estado local.
2. Crear o reutilizar una vista para el listado.
3. Guardar datos mock en `src/data/*.json` si todavía no existe backend.
4. Exponer un campo de filtro y un botón `Buscar`.
5. Filtrar con un `computed` sobre una copia normalizada de los datos.
6. Integrar la nueva vista en el menú principal.
7. Verificar que el layout responda bien en mobile.

## Workflow

### 1. Revisar la estructura actual

- Leer `App.vue`, layout principal, router o menú.
- No introducir `vue-router` si la app todavía no lo necesita.
- Mantener el patrón existente si el proyecto ya tiene sistema de navegación.

### 2. Definir la fuente de datos

- Para prototipos, usar `src/data/nombre-del-recurso.json`.
- Elegir nombres de campos consistentes y orientados al negocio.
- Evitar mezclar datos mock dentro del componente salvo que el cambio sea mínimo.

### 3. Implementar filtro y búsqueda

- Usar dos estados si el flujo lo pide:
  `searchInput` para lo que escribe el usuario.
  `appliedFilter` para aplicar el filtro solo al presionar `Buscar` o `Enter`.
- Crear un `computed` para devolver todos los datos si no hay filtro.
- Normalizar a minúsculas y combinar campos si la búsqueda debe revisar varias columnas.

### 4. Pintar el listado

- Preferir tabla para datos tabulares.
- Añadir estado vacío cuando no existan coincidencias.
- Mantener nombres de columnas claros y evitar lógica compleja en el template.

### 5. Integrar al menú principal

- Añadir la opción visible en la navegación principal.
- Marcar el estado activo si el menú soporta selección.
- No romper la pantalla inicial existente; extenderla.

## Implementation Notes

- Usar `script setup` y Composition API.
- Mantener el estado local cuando no haya necesidad real de Pinia.
- Separar la vista de inicio y la vista de listado si mejora la legibilidad.
- Si la app es pequeña, una navegación por estado local es válida.
- Si ya existe router, registrar la nueva ruta y enlazarla desde el menú.

## Reference

Leer [references/pattern.md](references/pattern.md) si necesitas una guía corta de estructura, naming y checklist para este tipo de pantalla.

## Example Request

`Crea una pantalla en Vue 3 para listar clientes desde un JSON local, agrega filtro por nombre o estado, botón Buscar y súmala al menú principal. Usa $vue-data-list-screen.`
