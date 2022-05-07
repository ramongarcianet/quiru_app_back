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
  escucharInicializarVoz,
  detenerInicializarVoz,
  item,
  textoEscuchado,
  listaDeDientes,
  listaDeHallazgos
} from "../../store/odontograma";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const listaDiccionario = obtenerTodoDiccionario();
const listaPieza = obtenerTodoPieza();
const listaHallazgo = obtenerTodoHallazgo();
const listaCaries = obtenerTodoCaries();
const {push} = useRouter()

escucharInicializarVoz();

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



</script>

<template lang="pug">
p {{textoEscuchado}}
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
    Diente( v-model:pieza='item.pieza' v-model:hallazgo='item.hallazgo' v-model:diente='item.diente' )
.row
    .col
        button.btn.btn-primary(type="submit", @click="agregarLista(route.params.idOdontograma)") Agregar a la lista

</template>

<style lang="sass" scoped>


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
