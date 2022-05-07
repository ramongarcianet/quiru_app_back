<script setup>
import { onMounted,onUnmounted } from "vue";
import {
  DienteCaries,
  ChangeHallazgo,
} from "../../store/OdontoJS";
import {
  obtenerTodoDiccionario,
  obtenerTodoPieza,
  obtenerTodoHallazgo,
  obtenerTodoCaries,
} from "../../store/odonto";
import {
  procesar,
  agregarLista,
  isSpeech,
  terminar,
  inicializarReconocimientoVoz,
  detenerInicializarVoz

} from "../../store/odontograma";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const listaDiccionario = obtenerTodoDiccionario();
const listaPieza = obtenerTodoPieza();
const listaHallazgo = obtenerTodoHallazgo();
const listaCaries = obtenerTodoCaries();
const {push} = useRouter()

inicializarReconocimientoVoz(false);

let wakeLock = null;
onMounted(()=> {
  terminar();

  if ("wakeLock" in navigator) {
    try {
      wakeLock = navigator?.wakeLock.request("screen");
    } catch (err) {
      console.log(`${err.name}, ${err.message}`);
    }
  } else {
    console.log('wakeLock'+ false);
  }
})


const listaDeDientes = [
11,12,13,14,15,16,17,18,
21,22,23,24,25,26,27,28,
31,32,33,34,35,36,37,38,
41,42,43,44,45,46,47,48,
51,52,53,54,55,61,62,63,64,65,
71,72,73,74,75,81,82,83,84,85
]
const listaDeHallazgos = [
    {value: 'caries',        text: 'Caries'},
    {value: 'extraccion',    text: 'Extracción'},
    {value: 'ausente',       text: 'Ausente'},
    {value: 'fractura',      text: 'Fractura'},
    {value: 'restauracion',  text: 'Restauración'}

]

</script>

<template lang="pug">

#button-microfono
    button.NotpulsingButton#btnActivar(v-if="!isSpeech" type="submit" style="visibility:visible;" @click="procesar()")
        i.fa.fa-microphone
    button.pulsingButton#btnEscuchando(v-if="isSpeech" type="submit" style="visibility:visible;" @click="procesar()")
        .pulse-ring
            svg(width="60", height="60", viewBox="40 0 150 300")
            polyline(stroke-linejoin="round" points="50,150 125,50 200,150" stroke="white" stroke-width="25" fill="none")
            polyline(stroke-linejoin="bevel" points="50,250 125,150 200,250" stroke="white" stroke-width="25" fill="none")
        i.fa.fa-microphone
.row
    .col
        input#tipoReg(type="hidden", value="0")

        .input-group
            select.form-select#comboHallazgo(@change="ChangeHallazgo($event)")
                option(selected disabled) Hallazgo
                option(v-for='{text, value} of listaDeHallazgos' :value="value") {{text}}

            select.form-select#comboPieza
                option(selected disabled) Pieza
                option(v-for="item of listaDeDientes", :value="item") {{item}}
.row
    .col
        canvas#cvhallazgo(width="150" height="200") Su navegador no soporta canvas :(
    .col
        #button-diente
            input#piezatopcar( type="hidden", value="0" )
            #btntopcar( value="0" @click="DienteCaries('btntopcar')" )
                span Vestibular
            input#piezaleftCar( type="hidden", value="0" )
            #btnleftCar( value="0" @click="DienteCaries('btnleftCar')" )
                span Distal
            input#piezacenterCar( type="hidden", value="0" )
            #btncenterCar( value="0" @click="DienteCaries('btncenterCar')" )
                span Oclusal
            input#piezarigthCar( type="hidden", value="0" )
            #btnrigthCar( value="0" @click="DienteCaries('btnrigthCar')" )
                span Mesial
            input#piezabotCar(type="hidden", value="0")
            #btnbotCar( value="0" @click="DienteCaries('btnbotCar')" )
                span Palatino
.row
    .col
        button.btn.btn-primary(type="submit", @click="agregarLista(route.params.idOdontograma)") Agregar a la lista

</template>

<style lang="sass">


#button-microfono
    position: fixed
    top: 0
    right: 0
    z-index: 100

.NotpulsingButton
  border: none
  padding: 0
  border-radius: 100%
  width: 140px
  height: 140px
  font-size: 3em
  color: #fff
  padding: 0
  margin: 0
  background: rgb(139, 199, 252)
  position: relative
  z-index: 999
  display: inline-block
  line-height: 100px
  text-align: center
  white-space: nowrap
  vertical-align: middle
  touch-action: manipulation
  cursor: pointer
  user-select: none
  background-image: none

.pulsingButton
  border: none
  padding: 0
  border-radius: 100%
  width: 140px
  height: 140px
  font-size: 3em
  color: #fff
  padding: 0
  margin: 0
  background: red
  position: relative
  z-index: 999
  display: inline-block
  line-height: 100px
  text-align: center
  white-space: nowrap
  vertical-align: middle
  touch-action: manipulation
  cursor: pointer
  user-select: none
  background-image: none


</style>
