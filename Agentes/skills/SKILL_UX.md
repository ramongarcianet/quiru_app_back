---
name: vue-uxui-brand-refresh
description: Redisenar o refinar interfaces en Vue para alinearlas con una marca corporativa existente, mejorando jerarquia visual, accesibilidad, consistencia, navegacion, tarjetas, tablas, formularios y estados clave. Usar cuando se necesite aplicar un brand refresh, adaptar una app Vue a una referencia visual externa o crear una base UX/UI reusable para productos internos o B2B.
---

# Vue UXUI Brand Refresh

## Overview

Aplicar un refresh UX/UI completo en una app Vue sin romper su estructura funcional, priorizando claridad, contraste, escalabilidad visual y consistencia entre pantallas.

Mantener la solucion implementable: si la app es pequena, usar estado local y CSS global claro antes de introducir complejidad innecesaria.

## Workflow

### 1. Auditar la experiencia actual

- Leer `App.vue`, layout principal, vistas y estilos globales.
- Identificar jerarquia debil, inconsistencias de color, espaciado, navegacion y componentes repetidos.
- Confirmar si existe design system o si se debe crear una base nueva.

### 2. Traducir la referencia visual

- Revisar la marca o sitio de referencia antes de proponer colores.
- Extraer direccion visual, no solo colores: contraste, densidad, ritmo, superficies, elevacion y tono general.
- Convertir esa referencia en tokens de diseno dentro de `:root` o en el sistema existente.

### 3. Redisenar la shell principal

- Mejorar cabecera, menu principal, resumen superior y distribucion general.
- Garantizar que la navegacion activa sea visible y consistente.
- Usar layouts que sigan funcionando en desktop y mobile.

### 4. Unificar componentes de contenido

- Normalizar tarjetas, tablas, filtros, botones, badges y estados vacios.
- Definir clases reutilizables para chips de estado, bloques KPI y paneles destacados.
- Evitar pantallas aisladas con estilos ad hoc.

### 5. Validar accesibilidad y legibilidad

- Mantener contrastes altos en texto y CTA.
- Asegurar foco visible en controles interactivos.
- Evitar depender solo del color para comunicar estado cuando sea posible.

## Implementation Notes

- Preferir variables CSS semanticas como `--accent`, `--muted`, `--card`, `--border` y `--text-dark`.
- Introducir gradientes y superficies solo si mejoran jerarquia; no como decoracion gratuita.
- Mantener nombres de clases legibles y orientados a patrones (`stat-card`, `status-pill`, `topbar-banner`).
- Si ya existe una marca definida, preservarla por encima de preferencias esteticas nuevas.

## Reference

Leer [references/uxui-checklist.md](references/uxui-checklist.md) para una lista corta de validacion antes de cerrar el refresh.

## Example Request

`Usa $vue-uxui-brand-refresh para adaptar todas las pantallas de esta app Vue a la estetica de una marca corporativa, con nueva paleta, mejor jerarquia visual y componentes consistentes.`
