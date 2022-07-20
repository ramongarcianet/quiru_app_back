<script setup>
import { onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { item, guardar, actualizar, limpiar, leerEnRegistro, obtenerTodos, registro } from "../../store/precios";
import {isLetter,isNumber} from '../../config/libreria'
import tratamientos from '../../config/Cie10.json';
const maxDinero = ref(5);
obtenerTodos();
let index = 0;


const guardarOActualizar = () => {
  if (item.value.id) {
    return actualizar(item.value);
  }
  else {
    index = registro.value.findIndex(i => i.tipo == item.value.tipo);
    if( index == -1 || index == undefined) {
      return guardar(item.value);
    }
    else {
      alert("existe registro")
    }
  }
};
const route = useRoute()
const {back, push} = useRouter()
let obtener
if (route.params.idPaciente) {
  leerEnRegistro(route.params.idPaciente)
}
onUnmounted(()=> {
  limpiar()
  if (obtener) obtener();
})

</script>

<template lang="pug">

//.d-flex.justify-content-between
  i.fa.fa-coins-ul(style="color: #37DFBB; font-weight:bold; font-size: 1.5em;")
  h1(style="color: #37DFBB; font-family: var(--font-family)") Llenar Precios

Form( :onPromise='()=>guardarOActualizar()' :onSuccess='()=>back()')
  .row
    label.form-label Hallazgos
      .col-3
        select.form-select.mt-3(v-model="item.tipo", required )
          option(disabled) SELECCIONE
          option(v-for="tratamiento of tratamientos.CIE10" :value='tratamiento.HALLAZGO') {{tratamiento.HALLAZGO}}
    label.form-label Precio 
      .col-3
        input.form-control.mt-3.mb-3(placeholder="precio", v-model="item.precio", @keypress="isNumber($event)",required,:maxlength="maxDinero",)

  .d-flex
    button.btn.btn-primary(@click="push({ name: 'precios', params: {} })") Volver
    button.ms-auto.btn.btn-primary(type='submit') Guardar

//.div(v-if="index == -1 || index == undefined")
  p El Hallazgo ya ha sido registrado

</template>