<script setup>
import { cerrarSesion, miUsuario } from "../store/sesion";
import {alertMensaje} from "../store/helper"
import { useRouter, useRoute } from "vue-router";
import Logo from "../assets/logoQuiru.vue";
import { ref, computed, watch} from "vue";
const { push } = useRouter();
const route = useRoute();
const verDialog = ref(false)

watch(
  ()=> alertMensaje.value,
  ()=> verDialog.value = true
)
const rutas = computed(() => [
  /*{
    name: "Admisión",
    onClick: () => push({ name: "admision" }),
    icon: "fa-solid fa-calendar",
    routeName: "admision",
    aditionalClass: "d-none d-sm-block",
  },*/
  {
    name: "Pacientes",
    onClick: () => push({ name: "pacientes" }),
    icon: "fa-solid fa-address-book",
    routeName: "paciente",
  },
  {
    name: "Precios",
    onClick: () => push({ name: "precios" }),
    icon: "fa-solid fa-coins",
    routeName: "precios",
  },
  {
    name: "Ayuda",
    onClick: () => push({ name: "ayuda" }),
    icon: "fas fa-question-circle",
    routeName: "ayuda",
  },
  {
    name: "Menú",
    onClick: () => (isActive.value = !isActive.value),
    icon: isActive.value ? "fa-solid fa-times" : "fa-solid fa-bars",
    aditionalClass: "d-sm-none only-bottom-nav",
  },
 
]);
const rutasMoviles = computed(() => [
  {
    name: "Paciente",
    onClick: () => push({ name: "pacientes" }),
    icon: "fa-solid fa-address-book",
    routeName: "paciente",
  },
  {
    name: "Precios",
    onClick: () => push({ name: "precios" }),
    icon: "fa-solid fa-coins",
    routeName: "precios",
  },
  /*{
    name: "Ayuda",
    onClick: () => push({ name: "ayuda" }),
    icon: "fa-solid fa-question-circle",
    routeName: "ayuda",
  },*/
  {
    name: "Cerrar sesión",
    onClick: () => cerrarSesion(),
    icon: "fa-solid fa-sign-out",
  },
]);
const rutasAdministrador = [
  /*{
    name: "Usuarios",
    onClick: () => push({ name: "usuarios" }),
    icon: "fa-solid fa-user-doctor",
    routeName: "usuarios",
  },

  {
    name: "Diccionario",
    onClick: () => push({ name: "diccionarios" }),
    icon: "fa-solid fa-book",
    routeName: "diccionario",
  },*/
];
const rutasInferior = [
  {
    name: "Cerrar sesión",
    onClick: () => cerrarSesion(),
    icon: "fa-solid fa-sign-out",
  },
];

const isActive = ref(false);
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
</script>
<template lang="pug">

Dialog( v-model='verDialog' )
  template(#title) Alerta de sistema
  template(#body) {{alertMensaje}}

.container-fluid.vh-100.d-flex.px-0
  nav.nav.vh-100( :class="`nav ${isActive ? 'active' : ''}`" )
    Logo(fill="currentcolor" @click='isActive = !isActive' )
    div
      button.btn.btn-primary.mb-3(:title= 'name' v-for="{ name, onClick, icon, routeName, aditionalClass }, i of rutas" :key='`rutas-${i}`' @click="onClick()" :class='`${routeName == route.name ? "active" : ""} ${aditionalClass}`')
        i.fa-xl( :class="icon" :label="name" )
    div
      button.btn.btn-primary(v-for="{ name, onClick, icon }, i of rutasAdministrador" :key='`rutas-${i}`' @click="onClick()" )
        i.fa-xl( :class="icon" :label="name" )
    div
      button.btn.btn-primary(title='Cerrar Sesion' v-for="{ name, onClick, icon }, i of rutasInferior" :key='`rutas-${i}`' @click="onClick()" )
        i.fa-xl( :class="icon" :label="name" )
  nav.nav-mobile.d-sm-none
    button.btn.btn-outline-light( v-for="{ name, onClick, icon, routeName, aditionalClass }, i of rutasMoviles" :key='`rutas-${i}`' :class='`${routeName == route.name ? "active" : ""} ${aditionalClass}`' @click="onClick()" )
      i.fa-xl( :class="icon" :label="name" )
  #body.py-5
    .container
      router-view

  #info

</template>
<style lang="sass" scoped>

.nav
  flex-shrink: 0
  height: calc( 100% - 2rem )
  padding: 1rem
  background: var(--color-primary)
  width: 4rem
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
      width: 180px
      display: block
      i
        &::after
          opacity: 1
          transform: scale(1)
          font-size: 1rem
          font-weight: 300
          width: 100%
          transition: .3s opacity .5s
          pointer-events: auto

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
          pointer-events: none
          margin-left: .25rem
          font-size: 1em
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
        width: 45px
        height: 100%
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
            opacity: 0
            margin-left: .25rem
            transform: scale(1)
            transition: .3s opacity .5s
</style>
