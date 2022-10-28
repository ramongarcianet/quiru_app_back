<script setup>
import instrucciones from '../8.Ayuda/instrucciones.vue';
</script>

<template lang="pug">
.row
  .col-10
    h1.my-0(style="color: #395D56; font-size: 1.5em; font-family: var(--font-family)") Prueba
    h1(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") Diciendo esto
  .col-2
instrucciones

</template>

<style>
ion-icon {
  pointer-events: none;
}
</style>
