<script setup>
import {sesion} from './store/sesion'
import { obtenerTodoDiccionario } from "./store/odonto";
sesion()
const listaDiccionario = obtenerTodoDiccionario();
</script>

<template>

  <router-view></router-view>

</template>

<style lang="sass">
html
  height: -webkit-fill-available
  scroll-behavior: smooth
body
  margin: 0
  height: 100%
  padding: 0
  min-height: 100vh
#app
  height: 100%
  min-height: 100vh
@media (max-width 575px)
  .container
    padding-left: 1rem
    padding-right: 1rem
.icon
  width: 30px
  height: 30px
  color: currentcolor
::selection
  background: rgba(0, 102, 255, 0.2)
</style>
