<script setup>
import { onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { item, guardar, actualizar, limpiar, leerEnRegistro } from "../../store/precios";
import {isLetter,isNumber} from '../../config/libreria'
import tratamientos from '../../config/Cie10.json';
const guardarOActualizar = () => {

  if (item.value.id) return actualizar(item.value);
  else return guardar(item.value);
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
  i.fa.fa-list-ul(style="color: #37DFBB; font-weight:bold; font-family: var(--font-family); font-size: 1.5em;")
    |  Llenar Precios

Form( :onPromise='()=>guardarOActualizar()' :onSuccess='()=>back()')
  .row
    label.form-label Hallazgos
      .col-3
        select.form-select.mt-3(aria-label="form-select-lg example" v-model="item.tipo" required)
          option(selected, disabled) Hallazgos
          option(v-for="tratamiento of tratamientos.CIE10" :value='tratamiento.HALLAZGO') {{tratamiento.HALLAZGO}}
    label.form-label Precio 
      .col-3
        input.form-control.mt-3.mb-3(placeholder="precio" v-model="item.precio", type="number", step="0.01" ,required)

  .d-flex
    button.btn.btn-primary(@click="push({ name: 'precios', params: {} })") Volver
    button.ms-auto.btn.btn-primary(type='submit') Guardar

</template>