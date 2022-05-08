<script setup>
import {
  procesar,
  isSpeech,
  flagLimpiar,
  escucharInicializarVoz,
  detenerInicializarVoz,
  item,
  textoEscuchado
} from "../../store/odontograma";

import { onUnmounted, onMounted, computed, watch, ref} from "vue";


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

const listaDeInstrucciones = computed( ()=>[
  [
    {text: "Despierta a Quiru con «Hola Quiru»", condicion: isSpeech.value},
    {text: "Menciona el hallazgo diciendo: «Hallazgo caries»", condicion: !item.value.hallazgo},
    {text: "Indica las piezas: «Carie palatino»", condicion: !item.value.pieza},
    {text: "Por último el número de diente: «Pieza 15»", condicion: !item.value.diente},
    {text: "Intentemos una vez más: «Limpiar»", condicion: true},
  ],
  [
    {text: "Despierta a Quiru con «Hola Quiru»", condicion: !isSpeech.value},
    {text: "Menciona el hallazgo diciendo: «Hallazgo extracción»", condicion: item.value.hallazgo},
    {text: "Por último el número de diente: «Pieza 25»", condicion: item.value.diente},
    {text: "Intentemos una vez más: «Limpiar»", condicion: true},
  ],
  [
    {text: "Despierta a Quiru con «Hola Quiru»", condicion: !isSpeech.value},
    {text: "Menciona el hallazgo diciendo: «Hallazgo fractura", condicion: item.value.hallazgo},
    {text: "Por último el número de diente: «Pieza 33»", condicion: item.value.diente},
    {text: "Intentemos una vez más: «Limpiar»", condicion: true},
  ],
  [
    {text: "Despierta a Quiru con «Hola Quiru»", condicion: !isSpeech.value},
    {text: "Menciona el hallazgo diciendo: «Hallazgo restauración»", condicion: item.value.hallazgo},
    {text: "Indica las piezas: «Carie distal»", condicion: item.value.pieza},
    {text: "Por último el número de diente: «Pieza 48»", condicion: item.value.diente},
    {text: "Intentemos una vez más: «Limpiar»", condicion: true},
  ],
  [
    {text: "Despierta a Quiru con «Hola Quiru»", condicion: !isSpeech.value},
    {text: "Menciona el hallazgo diciendo: «Hallazgo ausente»", condicion: item.value.hallazgo},
    {text: "Por último el número de diente: «Pieza 75»", condicion: item.value.diente},
    {text: "Intentemos una vez más: «Limpiar»", condicion: true},
  ]
])

const numeroDeInstruccion = ref(0)
watch(
  ()=> flagLimpiar.value,
  ()=> {
    if ( numeroDeInstruccion.value == listaDeInstrucciones.length - 1 ) numeroDeInstruccion.value = 0
    else numeroDeInstruccion.value ++
  }
)

const instruccion = computed(()=> listaDeInstrucciones.value[numeroDeInstruccion.value].find( ({condicion}) => !condicion)?.text)
</script>

<template lang="pug">

.d-flex.flex-column.align-items-center
  MicroButton.mt-5( :class="{active: isSpeech}" @click="procesar()")

  h1.mt-2.light-text Prueba
    strong.dark-text Quiru {{numeroDeInstruccion}}
  .d-flex.w-100.flex-column
    .mensaje {{instruccion}}
    .mensaje {{textoEscuchado?.[0] || "Empieza por Hola Quiru"}}


  Diente( v-model:pieza='item.pieza' v-model:hallazgo='item.hallazgo' v-model:diente='item.diente' )

</template>

<style lang="sass" scoped>

.mensaje
  min-height: calc( 24px + 1rem )
  color: var(--bs-gray-600)
  padding: .5rem 1rem
  margin-bottom: .5rem
  border-radius: 1rem

  &:first-child
    background-color: white
    margin-right: auto
    text-align: left 
    border-top-left-radius: 0
  &:last-child
    background-color: rgba(0, 0, 0, .25)
    color: white
    margin-left: auto
    border-top-right-radius: 0

    text-align: right 
    
</style>