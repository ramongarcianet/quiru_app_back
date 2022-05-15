<script setup>
import {
  isSpeech,
  flagLimpiar,
  escucharInicializarVoz,
  detenerInicializarVoz,
  registro_,
  item,
  textoEscuchado,
  detenerVoz,
  verOdontograma,
} from "../../store/odontograma";

import { onUnmounted, onMounted, computed, watch, ref} from "vue";
import { useRouter } from "vue-router";

const {back, push} = useRouter()
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
  detenerVoz()
})

const listaDeInstrucciones = computed( ()=>[
  [
    {text: "Despierta a Quiru con «Hola Quiru»", condicion: !isSpeech.value },
    {text: "Empecemos por una carie: «25 Caries por vestibular»", condicion: !item.value.hallazgo},
    {text: "Probemos una más: «Siguiente»", condicion: true},

  ],
  [
    {text: "Empecemos por una carie: «25 Restauración por vestibular»", condicion:  !item.value.hallazgo},
    {text: "Probemos una más: «Siguiente»", condicion: true},

  ],
  [
    {text: "Empecemos por una carie: «51 ausente»", condicion:  !item.value.hallazgo},
    {text: "Probemos una más: «Siguiente»", condicion: true},
  ],
  [
    {text: "Empecemos por una carie: «15 extracción»", condicion:  !item.value.hallazgo},
    {text: "Probemos una más: «Siguiente»", condicion: true},
  ],
  [
    {text: "Empecemos por una carie: «24 fractura»", condicion:  !item.value.hallazgo},
    {text: "Gracias por probar Quiru, puedes seguir probando las funciones o apagar el asistente con un: «Gracias»", condicion: true},
  ],


])

const numeroDeInstruccion = ref(0)
watch(
  ()=> flagLimpiar.value,
  ()=> {
    if ( numeroDeInstruccion.value < listaDeInstrucciones.value.length -1 )  numeroDeInstruccion.value ++
    else numeroDeInstruccion.value = 0
  
  }
)

const instruccion = computed(()=> listaDeInstrucciones.value[numeroDeInstruccion.value].find( ({condicion}) => condicion)?.text)
</script>
<template lang="pug">
.container-fluid
    .container.h-100
        .row.d-flex.justify-content-center.h-100
            .col-12.col-md-8.col-lg-6.d-flex.flex-column.align-items-center
                .d-flex.align-items-center.justify-content-center.p-2
                    MicroButton( style='--size: 2rem' :class="{active: isSpeech}" @click="isSpeech ? detenerVoz() : activarVoz()")
                    h1.ms-1.mt-2.light-text Quiru 
                .my-3
                    Odontograma( :registro='registro_')

               
                .d-flex.w-100.flex-column.p-2
                    .mensaje {{instruccion}}
                    .mensaje {{textoEscuchado?.[0] || "Empieza por Hola Quiru"}}
                    .mensaje Regístrate para probar la 
                        strong versión completa
                
                .d-flex.mt-auto
                    button.mb-4.btn.btn-light(@click='push({name: "inscripcion"})') Probar la versión completa
                
        i.fa-solid.fa-times.fa-2x.light-text( @click='back()')
</template>

<style lang="sass" scoped>
i
    position: fixed
    top: 1rem
    right: 2rem
    cursor: pointer
.container-fluid 
    height: 100vh
    min-height: -moz-available
    min-height: -webkit-fill-available
    min-height: fill-available
    width: 100%
    background: var(--bs-primary)

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