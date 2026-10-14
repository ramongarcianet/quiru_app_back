# Vue Data List Pattern

## Checklist

- Crear o reutilizar una vista dedicada.
- Centralizar datos mock en `src/data/*.json`.
- Exponer `searchInput` y `appliedFilter` si la búsqueda se dispara con botón.
- Filtrar en un `computed`.
- Añadir estado vacío.
- Integrar la entrada en el menú principal.
- Validar comportamiento mobile.

## Naming

- Usar nombres directos como `DataListView.vue`, `items.json`, `searchInput` y `filteredItems`.
- Mantener los nombres del dominio cuando ya existan en el proyecto.

## UI Guidance

- Diseñar una barra superior con título y contador de resultados.
- Agrupar filtro y acción en una franja visible.
- Permitir scroll horizontal de tabla en pantallas pequeñas si hace falta.
