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
  activarMicro,
} from "../../store/odontograma";
import marketing from "../../store/marketing";
import { onUnmounted, onMounted, computed, watch, ref} from "vue";
import { useRoute, useRouter } from "vue-router";
//const { registrarEvento } = marketing;
const route = useRoute()
const {back, push} = useRouter()
//escucharInicializarVoz();
activarMicro();
let wakeLock = null;
onMounted(()=> {
  if ("wakeLock" in navigator) {
    try {
      wakeLock = navigator?.wakeLock?.request("screen");
    } catch (err) {

    }
  } else {

  }
})
onUnmounted(()=>{
  detenerInicializarVoz()
  detenerVoz()
})

const listaDeInstrucciones = computed( ()=> !isSpeech.value
? [
    {text: "Dale acceso al micrófono y despierta a Quiru diciendo «Hola Quiru»", key:'1'},
  ]
: [
    {text: "Empecemos por una carie: «25 Caries por vestibular y distal»" , key:'2'},
    {text: "Puedes agregar una restauración: «18 restauración por palatino»" , key:'3'},
    {text: "Ahora agreguemos una fractura: «55 fractura»", key:'4'},
    {text: "También podemos agregar un grupo de hallazgos «De la 31 a la 34 ausente»", key:'5'},
    {text: "Si ha ocurriedo un error menciona «Limpiar 18».", key:'6'},
    {text: "Puedes seguir probando el Demo con los comandos «Caries», «Restauración», «Ausente», «Fractura» y «Extracción».", key:'7'},
  ])

const numeroDeInstruccion = ref(0)
watch(
  ()=> item.value.diente,
  ()=> {
    //registrarEvento("usoDemo")
    if ( numeroDeInstruccion.value < listaDeInstrucciones.value.length -1 )  numeroDeInstruccion.value ++
  }
)

const instruccion = computed(()=> listaDeInstrucciones.value[numeroDeInstruccion.value] )

</script>
<template lang="pug">
.container-fluid.h-100
    .container.h-100
        .row.d-flex.justify-content-center.h-100
            .col-12.col-md-8.col-lg-6.d-flex.flex-column.align-items-center
                .d-flex.align-items-center.justify-content-center.p-2
                    MicroButton( style='--size: 2rem' :class="{active: isSpeech}" @click="isSpeech ? detenerVoz() : activarVoz()")
                    h1.ms-2.mt-2.light-text QUIRU Dent AI
                .my-3
                    Odontograma( :registro='registro_')


                .d-flex.w-100.flex-column.p-2
                    .mensaje {{instruccion.text}}
                    .mensaje {{textoEscuchado?.[0] || "Empieza por Hola Quiru"}}


                .d-flex.mt-auto
                    button.mb-4.btn.btn-light(@click='push({name: "inscripcion", params: {codigo: route.params.codigo} })') Probar la versión completa

        i.bi.bi-x-lg.light-text( @click='back()')
</template>

<style lang="sass" scoped>
i
    position: fixed
    top: 1rem
    right: 2rem
    cursor: pointer
.container-fluid
    width: 100%
    background: linear-gradient(145deg, #071b40 0%, #38208f 100%)

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
