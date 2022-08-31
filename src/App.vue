<script setup>
import {sesion} from './store/sesion'
sesion()
</script>

<template>
  
  <router-view></router-view>

</template>

<style lang="sass">
html
  height: -webkit-fill-available
body
  margin: 0
  height: 100%
  padding: 0
#app
  height: 100%
@media (max-width 575px)
  .container
    padding: 0
</style>