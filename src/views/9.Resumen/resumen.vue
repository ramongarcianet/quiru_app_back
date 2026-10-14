<script setup>
import instrucciones from '../8.Ayuda/instrucciones.vue';
</script>

<template lang="pug">
.row
  .col-10
    h1.my-0(style="color: var(--brand-navy); font-size: 1.5em") Nuestros
    h1(style="color: var(--voice-cyan); font-weight:bold; font-size: 1.5em") Comandos de voz
  .col-2
instrucciones

</template>

<style>
ion-icon {
  pointer-events: none;
}
</style>
