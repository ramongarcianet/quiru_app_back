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
    {text: "Despierta a Quiru con «Hola Quiru»", condicion: !isSpeech.value },
    {text: "Menciona el hallazgo diciendo: «Hallazgo caries»", condicion: !item.value.hallazgo},
    {text: "Indica las piezas: «Caries palatino»", condicion: !item.value.pieza.length },
    {text: "Por último el número de diente: «Pieza 15»", condicion: item.value.diente == "00"},
    {text: "Intentemos una vez más: «Otra vez»", condicion: true},
  ],
  [
    {text: "Despierta a Quiru con «Hola Quiru»", condicion: !isSpeech.value},
    {text: "Probemos algo más completo. Di: «Hallazgo extracción pieza 25»", condicion: !item.value.hallazgo},
    {text: "Intentemos una vez más: «Otra vez»", condicion: true},
  ],
  [
    {text: "Despierta a Quiru con «Hola Quiru»", condicion: !isSpeech.value},
    {text: "Podemos acortar palabras, por ejemplo: «Hallazgo fractura 33»", condicion: !item.value.hallazgo},
    {text: "Intentemos una vez más: «Otra vez»", condicion: true},
  ],
  [
    {text: "Despierta a Quiru con «Hola Quiru»", condicion: !isSpeech.value},
    {text: "Ahora un traba lenguas: «Hallazgo restauración parte vestibular pieza 85»", condicion: !item.value.hallazgo},
    {text: "Intentemos una vez más: «Otra vez»", condicion: true},
  ],
  [
    {text: "Despierta a Quiru con «Hola Quiru»", condicion: !isSpeech.value},
    {text: "Pero recuerda, hay formas más fáciles: «Hallazgo ausente 75»", condicion: !item.value.hallazgo},
    {text: "Intentemos una vez más: «Gracias»", condicion: true},
  ],
  [
    {text: "Gracias por probar Quiru, puedes seguir probando las funciones", condicion: true},0

  ]
])

const numeroDeInstruccion = ref(0)
watch(
  ()=> flagLimpiar.value,
  ()=> {
    console.log(numeroDeInstruccion.value < listaDeInstrucciones.value.length - 1 )
    if ( numeroDeInstruccion.value < listaDeInstrucciones.value.length - 1 )  numeroDeInstruccion.value ++
    else numeroDeInstruccion.value = 0
  }
)

const instruccion = computed(()=> listaDeInstrucciones.value[numeroDeInstruccion.value].find( ({condicion}) => condicion)?.text)
</script>

<template lang="pug">
.d-flex.align-items-center.justify-content-start.p-2
  MicroButton( style='--size: 2rem' :class="{active: isSpeech}" @click="procesar()")
  h1.ms-1.mt-2.light-text Quiru {{numeroDeInstruccion}}
.mb-5.d-flex.justify-content-center
  Diente( v-model:pieza='item.pieza' v-model:hallazgo='item.hallazgo' v-model:diente='item.diente' )
.mt-auto.d-flex.w-100.flex-column.p-2
  .mensaje {{instruccion}}
  .mensaje {{textoEscuchado?.[0] || "Empieza por Hola Quiru"}}
  .mensaje Regístrate para probar la 
    strong versión completa

</template>

<style lang="sass" scoped>

.mensaje
  min-height: calc( 24px + 1rem )
  color: var(--bs-gray-600)
  padding: .5rem 1rem
  margin-bottom: .5rem
  border-radius: 1rem
  max-width: 80%
  &:nth-child(2n)
    background-color: rgba(0, 0, 0, .25)
    margin-left: auto
    border-top-right-radius: 0
    color: white
  &:nth-child(2n+1)
    background-color: white
    margin-right: auto
    border-top-left-radius: 0
    
</style>