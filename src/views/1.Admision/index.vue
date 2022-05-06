<script setup>

import {
  diagnostico,
  tratamiento,
  procesar,
  limpiar,
  agregarLista,
  isSpeech,
  terminar,
  inicializarReconocimientoVoz,
  detenerInicializarVoz
} from "../../store/odontograma";
import {ChangeHallazgo,VerDemo,clearcanvas,VerTipoCaries, VerDataTipoCaries} from '../../store/OdontoJS'
import {obtenerTodos, registro,  eliminar,  guardar, obtenerTodoDiccionario, obtenerTodoPieza,obtenerTodoHallazgo,obtenerTodoCaries} from '../../store/odonto'
import { onUnmounted } from "@vue/runtime-core";

const listaDiccionario = obtenerTodoDiccionario();
const listaPieza = obtenerTodoPieza();
const listaHallazgo = obtenerTodoHallazgo();
const listaCaries = obtenerTodoCaries();

inicializarReconocimientoVoz(true);
onUnmounted(()=>detenerInicializarVoz())

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
const listaDeTipos = [
    {value: 'vestibular',        text: 'Vestibular'},
    {value: 'distal',    text: 'Distal'},
    {value: 'oclusal',       text: 'Oclusal'},
    {value: 'mesial',      text: 'Mesial'},
    {value: 'palatino',  text: 'Palatino'}
]
</script>
<template lang="pug">

<div class="d-flex">

  <button v-if='!isSpeech' type="submit" class="NotpulsingButton" style="visibility:visible;" id="btnActivar" @click="procesar()" >
    <i class="fa fa-microphone" ></i>
  </button>
  <button v-if='isSpeech' type="submit" class="pulsingButton" style="visibility:visible;" id="btnEscuchando" @click="procesar()">
    <div class="pulse-ring">
      <svg width="60" height="60" viewBox="40 0 150 300">
        <polyline stroke-linejoin="round" points="50,150 125,50 200,150" stroke="white" stroke-width="25" fill="none"></polyline>
        <polyline stroke-linejoin="bevel" points="50,250 125,150 200,250" stroke="white" stroke-width="25" fill="none"></polyline>
      </svg>
    </div>
    <i class="fa fa-microphone" ></i>
  </button>
  h1.mt-4.light-text Prueba
    strong Quiru
</div>
<ul>
<li>Hallazgo caries, caries distal, pieza 15 </li>
<li>Hallazgo restauración, caries palatino, pieza 25 </li>
<li>Hallazgo extración, pieza 23 </li>
<li>Hallazgo fractura, pieza 18 </li>
<li>Hallazgo ausente, pieza 12 </li>
</ul>
<div style="text-align: center;">
  <canvas id="cvhallazgo" width="250" height="300" ></canvas>
</div>
<input id="tipoReg" type="hidden" value="0"/>
<div class="row">
  <div v-show="true" class="input-group">
    <select class="form-select" id="comboHallazgo"  @change="VerTipoCaries($event)">
      option( selected disabled value="" ) Hallazgo
      option( v-for="{value, text} of listaDeHallazgos" :value="value") {{text}}
    </select>
    <div id="cTipCaries">
      <select class="form-select" id="comboHallazgoTipo" @change="VerDataTipoCaries()">
        option( selected disabled value="" ) Tipo Carie
        option( v-for="{value, text} of listaDeTipos" :value="value") {{text}}
      </select>
    </div>
    <select class="form-select" id="comboPieza" @change="VerDemo($event.target.value)">
      option( selected disabled value="00" ) Pieza
      option( v-for='item of listaDeDientes' :value="item" ) {{item}}
    </select>

  </div>
</div>

</template>

<style>
#cvhallazgo{

  border: 0;

}
.NotpulsingButton {
    border: none;
    padding: 0;
    border-radius: 100%;
    width: 70px;
    height: 70px;
    font-size: 3em;
    color: #fff;
    padding: 0;
    margin: 0;
    background: rgb(139, 199, 252);
    position: relative;
    z-index: 999;
    display: inline-block;
    line-height: 100px;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
}
.pulsingButton {
    border: none;
    padding: 0;
    border-radius: 100%;
    width: 70px;
    height: 70px;
    font-size: 3em;
    color: #fff;
    padding: 0;
    margin: 0;
    background: red;
    position: relative;
    z-index: 999;
    display: inline-block;
    line-height: 100px;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
}

.pulse-ring {
    content: '';
    width: 70px;
    height: 70px;
    background: #189BFF;
    border: 5px solid #189BFF;
    border-radius: 50%;
    position: absolute;
    top: 0px;
    left: 0px;
    animation: pulsate infinite 1.5s;
}

@-webkit-keyframes pulsate {
    0% {
        -webkit-transform: scale(1, 1);
        opacity: 1;
    }

    100% {
        -webkit-transform: scale(1.3, 1.3);
        opacity: 0;
    }
}


</style>