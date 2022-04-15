<script setup>
import {cerrarSesion, miUsuario} from '../store/sesion'
import {useRouter, useRoute} from 'vue-router'
import Logo from "../assets/logoQuiru.vue"
import { ref, computed } from 'vue'
const {push} = useRouter()
const route = useRoute()
const rutas = computed(()=>([
  { 
    name: 'Admisión',
    onClick: ()=>push({name: 'admision'}),
    icon: 'fa-solid fa-calendar',
    routeName: 'admision',
    aditionalClass: 'd-none d-sm-block',

  },
  { 
    name: 'Paciente',
    onClick: ()=>push({name: 'paciente'}),
    icon: 'fa-solid fa-address-book',
    routeName: 'paciente',
  },
  { 
    name: 'Odontograma',
    onClick: ()=>push({name: 'odontograma'}),
    icon: 'fa-solid fa-tooth',
    routeName: 'odontograma',

  },
  {
    name: 'Menú',
    onClick: ()=> isActive.value = !isActive.value,
    icon: isActive.value ? 'fa-solid fa-times' : 'fa-solid fa-bars',
    aditionalClass: 'd-sm-none only-bottom-nav',
  }
]))

const rutasAdministrador = [
  { 
    name: 'Usuarios',
    onClick: ()=>push({name: 'usuarios'}),
    icon: 'fa-solid fa-user-doctor',
    routeName: 'usuarios'
  },
  { 
    name: 'Diccionario',
    onClick: ()=>push({name: 'diccionario'}),
    icon: 'fa-solid fa-book',
    routeName: 'diccionario'
  },
]
const rutasInferior = [
  { 
    name: 'Cerrar sesión',
    onClick: ()=>cerrarSesion(),
    icon: 'fa-solid fa-sign-out'
  }
]

const isActive = ref(false)
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
</script>
<template lang="pug">
.container-fluid
  .nav( :class="`nav ${isActive ? 'active' : ''}`" )
    Logo( fill="currentcolor" @click='isActive = !isActive' )
    div
      button.icon( v-for="{name, onClick, icon, routeName, aditionalClass}, i of rutas" :key='`rutas-${i}`' @click="onClick()" :class='`${routeName == route.name ? "active" : ""} ${aditionalClass}`')
        i.fa-xl( :class="icon" :label="name" )
    div
      button.icon( v-for="{name, onClick, icon}, i of rutasAdministrador" :key='`rutas-${i}`' @click="onClick()" )
        i.fa-xl( :class="icon" :label="name" )
    div
      button.icon( v-for="{name, onClick, icon}, i of rutasInferior" :key='`rutas-${i}`' @click="onClick()" )
        i.fa-xl( :class="icon" :label="name" )
  .nav-mobile.d-sm-none  
    button.icon( v-for="{name, onClick, icon,routeName, aditionalClass}, i of rutas" :key='`rutas-${i}`' :class='`${routeName == route.name ? "active" : ""} ${aditionalClass}`' @click="onClick()" )
      i.fa-xl( :class="icon" :label="name" )  
  #body
    .container
      router-view

  #info
 

</template>
<style lang="sass" scoped>

.container-fluid
  height: 100vh
  height: calc(var(--vh, 1vh) * 100 - 1px) 
  display: flex
  width: 100vw
  padding: 0
    
.nav
  flex-shrink: 0
  height: calc( 100% - 2rem )
  padding: 1rem
  background: var(--color-primary)
  width: 2.5em
  display: flex
  flex-direction: column
  justify-content: space-between
  transition: .3s all .5s 
  .only-bottom-nav
    display: none
  svg
    height: 28px
    width: 28px
    color: var(--color-light)
  &.active
    width: 210px
    transition: .3s width, .3s left

    button
      width: 210px
      display: block
      i
        &::after
          opacity: 1
          transform: scale(1)
          width: 100%
          transition: .3s opacity .5s

  div
    margin: 0
    padding: 0
    display: flex
    flex-direction: column
    align-items: flex-start
    button 
      list-style: none
      width: 35px
      height: 35px
      margin: 0
      text-align: left
      transition: .3s width .2s
      display: block
      padding-left: .5rem
      i
        position: relative

        &::after
          content: attr(label)
          opacity: 0
          margin-left: .25rem
          transition: .3s opacity 
#body
  height: 100%
  width: 100%
  overflow-y: auto   
  background-color: var(--color-light)

#info
  width: 0

@media (max-width: 540px)
  .nav
    position: fixed
    width: 210px
    left: -100%
    &.active
      left: 0
    button
      width: 210px!important
      display: block
      i
        &::after
          opacity: 1!important
    z-index: 30
    .only-bottom-nav
      display: none!important
  .nav-mobile
    position: fixed
    display: flex
    justify-content: space-around
    align-items: center
    background: var(--color-primary)
    bottom: 0
    left: 0
    height: 2.7rem
    width: 100%
    z-index: 20
    .only-bottom-nav
      display: block
    button
      &.active
        width: 105px
        display: block
        i
          display: flex
          align-items: center
          justify-content: center
          padding-bottom: .5rem
          &::after
            position: absolute
            bottom: .5rem
            content: attr(label)
            font-size: var(--font-size-h6)
            opacity: 1
            margin-left: .25rem
            transform: scale(1)
            transition: .3s opacity .5s
    
</style>