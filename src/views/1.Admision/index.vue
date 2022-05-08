<script setup>
import {
  diagnostico,
  tratamiento,
  procesar,
  limpiar,
  agregarLista,
  isSpeech,
  escucharInicializarVoz,
  detenerInicializarVoz,
  listaDeDientes,
  listaDeHallazgos,
  listaDeTipos,
  item,
  textoEscuchado
} from "../../store/odontograma";
import {
  ChangeHallazgo,
  clearcanvas,
  VerTipoCaries,
  VerDataTipoCaries,
} from "../../store/OdontoJS";
import {
  obtenerTodos,
  registro,
  eliminar,
  guardar,
  obtenerTodoDiccionario
} from "../../store/odonto";
import { onUnmounted, onMounted, ref } from "vue";

const listaDiccionario = obtenerTodoDiccionario();

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
})


</script>

<template lang="pug">
<div class="d-flex">
  <button v-if='!isSpeech' type="submit" class="NotpulsingButton" style="visibility:visible;" id="btnActivar" @click="procesar()" >
    i.fa.fa-microphone
  </button>
  <button v-if='isSpeech' type="submit" class="pulsingButton" style="visibility:visible;" id="btnEscuchando" @click="procesar()">
    <div class="pulse-ring">
      <svg width="60" height="60" viewBox="40 0 150 300">
        polyline( stroke-linejoin="round" points="50,150 125,50 200,150" stroke="white" stroke-width="25" fill="none")
        polyline( stroke-linejoin="bevel" points="50,250 125,150 200,250" stroke="white" stroke-width="25" fill="none")
      </svg>
    </div>
    i( class="fa fa-microphone")
  </button>
  h1.mt-4.light-text Prueba
    strong Quiru
</div>
<ul>
li Hallazgo caries, caries distal, pieza 15
li Hallazgo restauración, caries palatino, pieza 25
li Hallazgo extración, pieza 23
li Hallazgo fractura, pieza 18
li Hallazgo ausente, pieza 12


</ul>
p has dicho: {{textoEscuchado}}

<div class="row">
  p {{item}}
  .d-flex.justify-content-center
    Diente( v-model:pieza='item.pieza' v-model:hallazgo='item.hallazgo' v-model:diente='item.diente' )
  <div v-show="true" class="input-group">
    <select class="form-select" id="comboHallazgo" v-model="item.hallazgo" @change="VerTipoCaries($event)">
      option(selected, disabled, value="") Hallazgo
      option(v-for="{value, text} of listaDeHallazgos", :value="value") {{ text }}
    </select>
    <div id="cTipCaries">
      <select  id="comboHallazgoTipo" v-model="item.pieza" multiple @change="VerDataTipoCaries()">
        option(selected, disabled, value="") Tipo Carie
        option(v-for="{value, text} of listaDeTipos", :value="value") {{ text }}
      </select>
    </div>
    <select class="form-select" id="comboPieza" v-model="item.diente" @change="VerDemo($event.target.value)">
      option(selected, disabled, value="00") Pieza
      option(v-for="item of listaDeDientes", :value="item") {{ item }}
    </select>

  </div>
  
</div>
</template>

<style>
#cvhallazgo {
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
  content: "";
  width: 70px;
  height: 70px;
  background: #189bff;
  border: 5px solid #189bff;
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