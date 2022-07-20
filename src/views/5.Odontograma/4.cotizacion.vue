<script setup>
import { onUnmounted, ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { item, guardar, actualizar, limpiar, leerEnRegistro, obtenerTodos, registro, eliminar } from "../../store/cotizacion";
import { isLetter, isNumber } from '../../config/libreria'
const maxDinero = ref(5);
const route = useRoute()
const { back, push } = useRouter()
const obtenerRegistro = obtenerTodos(route.params.idOdontograma);
let index = 0;
let total = 0;
const guardarOActualizar = () => {
  if (item.value.id) {
    return actualizar(item.value);
  }
  else {
    index = registro.value.findIndex(i => i.concepto == item.value.concepto);
    if (index == -1 || index == undefined) {
      item.value.idOdontograma = route.params.idOdontograma;
      item.value.estado = "pendiente";
      return guardar(item.value);
    } else {
      alert("existe registro")
    }
  }
};
let obtener
onUnmounted(() => {
  limpiar()
  if (obtener) obtener();
})
onMounted(() => {
  total = 0;
  registro.value.forEach(element => {
    total = Number(total) + Number(element.precio);
    let mensaje = document.getElementById('TotalSuma');
    mensaje.innerText ="S/. " + total.toFixed(2);
  });
})
watch(
  () => registro.value,
  () => {
    total = 0;
    registro.value.forEach(element => {
      total = Number(total) + Number(element.precio);
      let mensaje = document.getElementById('TotalSuma');
      mensaje.innerText ="S/. " + total.toFixed(2);
    });
  },
  { deep: true }
)
</script>

<template lang="pug">
h2.primary-text 
  i.fa-solid.fa-clipboard-list.me-2
  span Cotizacion
.container.fluid
  .container
    .row.mt-4
      Form( :onFunction='() => guardarOActualizar()')
        .row.d-flex.justify-content-left
          .col.d-flex.justify-content-left 
            span.input-group-text.pl-1 Concepto :
              input.form-control(placeholder="Concepto" v-model="item.concepto", required)
          .col.d-flex.justify-content-left
            span.input-group-text.pl-1 Precio :
              input.form-control(type="number" v-model="item.precio",required :maxlength="maxDinero")
          .col.d-flex.justify-content-left.mt-3
            button.btn.btn-primary(type='submit')
              i.fa.fa-plus.light-text
    .row
      .col.mt-4
        .div(style="background-color: white; border-radius: 2%;").mt-1
          table.table.table-hover
            thead
              tr
                th Concepto
                th Precio
                th Estado
                th
            tbody
              tr(v-for="item of registro"  :key="item.id"  :item="item")
                td {{ item.concepto }}
                td S/. {{ item.precio }}.00
                td(width="25%") {{ item.estado }} 
                td(width="25%")
                  BotonSeguro( :onSuccess= '() => eliminar(item.id)' )
                    i.fa.fa-trash-o(aria-hidden='true')
            tfoot
              tr
                th Total
                th  
                  span#TotalSuma.fw-bold
                th 
                th
.d-flex.mt-5
  button.btn.btn-primary(@click='push({ name: "pacienteVer", params: { idPaciente: route.params.idPaciente } })') Volver
</template>