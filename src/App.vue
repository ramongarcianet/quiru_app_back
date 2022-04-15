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
  padding: 0
</style>