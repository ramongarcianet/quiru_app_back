<script setup>
import { computed } from '@vue/runtime-core';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const {push} = useRouter()
const routeName = computed(()=>route.name)
const rutas = [
    {name:'Citas', icono:'fa-regular fa-calendar-days', ruta:'citas'},
    {name:'Pacientes', icono:'fa-solid fa-user', ruta:'pacientes'},
    {name:'Ayuda', icono:'fa-solid fa-question', ruta:'resumen'},
    
    //{name:'Configuración', icono:'settings-outline', ruta:'usuario'},

]
</script>

<template lang="pug">
.router
  ul
    li.list(v-for="ruta of rutas"  @click="push({name:ruta.ruta})" :class=" ruta.ruta == routeName ? 'active' : '' ")
      a
        span.icon
          i(:class= 'ruta.icono')
        span.route {{ruta.name}}
    .indicador
</template>

<style lang="sass" scoped>

.router
  z-index: 49
  bottom: 1rem
  left: 0
  right: 0
  margin: auto
  width: 280px
  height: 70px
  background: #ffffff
  position: fixed
  display: flex
  justify-content: center
  align-items: center
  border-radius: 10px
  box-shadow: 3px 3px 20px 0 rgba(0,0,0,0.025)
  ul
    display: flex
    width: 210px
    padding: 0
    margin: 0
    li
      position: relative
      list-style: none
      width: 70px
      z-index: 50
      cursor: pointer
      a
        position: relative
        display: flex
        justify-content: center
        align-items: center
        flex-direction: column
        width: 100%
        text-align: center
        font-weight: 500
        .route
          position: absolute
          color: var(--color-primary)
          font-weight: 400
          font-size: 0.70em
          letter-spacing: 0.05em
          transition: 0.5s
          opacity: 0
          transform: translateY(28px)
          user-select: none
        .icon
          position: relative
          display: block
          line-height: 32px
          font-size: 1.6em
          text-align: center
          transition: 0.5s
          color: var(--color-primary)

      &.active
        a
          .icon
            padding-top: 1px
            color: var(--color-white)
            transform: translateY(-32px)

          .route
            opacity: 1
            transform: translateY(15px)
.router ul li:nth-child(1).active ~ .indicador
  transform: translateX(calc(70px * 0)) scale(1)
  opacity: 1
.router ul li:nth-child(2).active ~ .indicador
  transform: translateX(calc(70px * 1)) scale(1)
  opacity: 1

.router ul li:nth-child(3).active ~ .indicador
  transform: translateX(calc(70px * 2)) scale(1)
  opacity: 1


.indicador
  position: absolute
  top: -50%
  width: 70px
  height: 70px
  background: var(--color-primary)
  border-radius: 50%
  border: 6px solid var(--color-light)
  transition: 0.5s
  opacity: 0
  transform: scale(0)
  &::before
    content: ""
    position: absolute
    top: 50%
    left: -22px
    width: 20px
    height: 20px
    background: transparent !important
    border-top-right-radius: 20px
    box-shadow: 1px -10px 0 0 var(--color-light)
  &::after
    content: ""
    position: absolute
    top: 50%
    right: -22px
    width: 20px
    height: 20px
    background: transparent !important
    border-top-left-radius: 20px
    box-shadow: -1px -10px 0 0 var(--color-light)
</style>