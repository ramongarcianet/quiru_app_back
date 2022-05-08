<script setup>
import {
  procesar,
  isSpeech,
  escucharInicializarVoz,
  detenerInicializarVoz,
  item,
  textoEscuchado
} from "../../store/odontograma";

import { onUnmounted, onMounted } from "vue";


escucharInicializarVoz();

let wakeLock = null;
onMounted(()=> {
  if ("wakeLock" in navigator) {
    try {
      wakeLock = navigator?.wakeLock?.request("screen");
    } catch (err) {
      console.log(`${err.name}, ${err.message}`);
    }
  } else {
    console.log('wakeLock'+ false);
  }
})
onUnmounted(()=>{
  detenerInicializarVoz()
  isSpeech.value = false;
})


</script>

<template lang="pug">

.d-flex.flex-column.align-items-center
  MicroButton.mt-5( :class="{active: isSpeech}" @click="procesar()")

  h1.mt-2.light-text Prueba
    strong.dark-text Quiru
  .mensaje «{{textoEscuchado?.[0] || "Empieza por Hola Quiru"}}»
ul
  li Hallazgo caries, caries distal, pieza 15
  li Hallazgo restauración, caries palatino, pieza 25
  li Hallazgo extración, pieza 23
  li Hallazgo fractura, pieza 18
  li Hallazgo ausente, pieza 12


.d-flex.justify-content-center
  Diente( v-model:pieza='item.pieza' v-model:hallazgo='item.hallazgo' v-model:diente='item.diente' )

</template>

<style lang="sass" scoped>

.mensaje
  min-height: calc( 24px + 1rem )
  color: var(--bs-gray-600)
  padding: .5rem 1rem
  margin: 1rem 0
  text-align: center
</style>