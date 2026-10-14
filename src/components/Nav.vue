<script setup>
import { computed } from '@vue/runtime-core';
import { useRoute, useRouter } from 'vue-router';
import { item } from '../store/usuario'
const route = useRoute()
const {push} = useRouter()
const routeName = computed(()=>route.name)
const rutas = [
    {name:'Citas', icono:'bi bi-calendar2-week', ruta:'citas'},
    {name:'Pacientes', icono:'bi bi-person', ruta:'pacientes'},
    //{name:'Estadisticas', icono:'bi bi-graph-up', ruta:'estadisticas'},
]
</script>
<template lang="pug">
.router(v-if=" route.name !== 'Detalle' " :class=" item.rol === 'admin' ? 'plusAdmin' : '' ")
  ul
    li.list(v-for="ruta of rutas" :class=" ruta.ruta == routeName ? 'active' : '' ")
      button.nav-action(type='button' @click="push({name:ruta.ruta})" :aria-current="ruta.ruta == routeName ? 'page' : undefined" :aria-label="`Ir a ${ruta.name}`")
        span.icon
          i(:class= 'ruta.icono')
        span.route {{ruta.name}}
    li.list(v-if="item.rol === 'admin'" :class=" 'admin' == routeName ? 'active' : '' ")
      button.nav-action(type='button' @click="push({name: 'admin' })" :aria-current="'admin' == routeName ? 'page' : undefined" aria-label='Ir a Administrador')
        span.icon
          i(class="bi bi-sliders")
        span.route Administrador
    .indicador
</template>
<style lang="sass" scoped>
.router
  z-index: 20
  bottom: 1.25rem
  left: 0
  right: 0
  margin: auto
  width: 280px
  min-height: 72px
  padding: 0.5rem
  background: rgba(255,255,255,0.88)
  backdrop-filter: blur(20px)
  position: fixed
  display: flex
  justify-content: center
  align-items: center
  border-radius: 20px
  border: 1px solid var(--color-border)
  box-shadow: 0 14px 34px rgba(7, 27, 64, 0.14)
  ul
    display: flex
    width: 100%
    padding: 0
    margin: 0
    justify-content: space-between
    gap: 0.3rem
    li
      position: relative
      list-style: none
      flex: 1
      z-index: 3
      cursor: pointer
      .nav-action
        position: relative
        display: flex
        justify-content: center
        align-items: center
        flex-direction: column
        width: 100%
        min-height: 58px
        gap: 0.2rem
        text-align: center
        border-radius: 14px
        font-weight: 700
        transition: background-color 0.25s ease, transform 0.25s ease, color 0.25s ease
        padding: 0.35rem
        border: 0
        background: transparent
        .route
          color: var(--color-dark-soft)
          font-size: 0.72rem
          line-height: 1
          transition: color 0.25s ease
          user-select: none
        .icon
          position: relative
          display: block
          line-height: 1
          font-size: 1.2rem
          text-align: center
          transition: 0.25s ease
          color: var(--text-secondary)

      &:hover
        .nav-action
          background: rgba(var(--color-primary-rgb), 0.06)

      &.active
        .nav-action
          background: var(--brand-blue)
          box-shadow: 0 8px 18px rgba(var(--color-primary-rgb), 0.22)
          transform: translateY(-3px)
          .icon
            color: var(--color-white)

          .route
            color: var(--color-white)
  &.plusAdmin
    width: 360px
    ul
      width: 100%

.indicador
  display: none

@media (max-width: 575px)
  .router
    width: calc(100% - 1.5rem)
    max-width: 420px
    bottom: 0.8rem
    &.plusAdmin
      width: calc(100% - 1.5rem)
</style>
