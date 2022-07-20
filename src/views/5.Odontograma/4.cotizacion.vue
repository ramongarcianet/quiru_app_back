<script setup>
import { onUnmounted, ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { item, guardar, actualizar, limpiar, leerEnRegistro, obtenerTodos, registro, eliminar } from "../../store/cotizacion";
import { isLetter, isNumber } from '../../config/libreria'
import { leerEnRegistro as ObtenerOdontograma, item as itemodontograma } from '../../store/formodontograma';
import Cie10 from '../../config/Cie10.json';
const maxDinero = ref(5);
const route = useRoute()
const { back, push } = useRouter()
const obtenerRegistro = obtenerTodos(route.params.idOdontograma);
if (route.params.idOdontograma) {
  ObtenerOdontograma(route.params.idOdontograma);
}
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
      item.value.cantidad = 1;
      let subtot = (Number(item.value.cantidad) * Number(item.value.precio));
      item.value.subtotal = subtot.toString();
      guardar(item.value);
      item.value = {};
    } else {
      let mensaje = document.getElementById('mensaje');
      mensaje.innerText = item.value.concepto + ", ya existe";
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
  registro?.value.forEach(element => {
    total = Number(total) + Number(element.subtotal);
  });
  let TotalSuma = document.getElementById('TotalSuma');
  TotalSuma.innerText = "S/. " + total.toFixed(2);
})
watch(
  () => registro.value,
  () => {
    total = 0;
    registro.value.forEach(element => {
      total = Number(total) + Number(element.subtotal);
    });
    let TotalSuma = document.getElementById('TotalSuma');
    TotalSuma.innerText = "S/. " + total.toFixed(2);
  },
  { deep: true }
)
function AddItemsAutomatico() {
  if (itemodontograma != undefined) {
    Cie10.CIE10.forEach(element => {
      let ubicacionnes = itemodontograma.value?.hallazgos.filter((elem) => elem.hallazgo.toUpperCase() == element.HALLAZGO);
      let Piezas = 0;
      if (ubicacionnes != undefined && ubicacionnes?.length > 0) {
        ubicacionnes.forEach(dient => {
          Piezas = Piezas + 1;
        });
        if (element.TRATAMIENTO != "") {
          item.value.concepto = element.TRATAMIENTO;
          item.value.precio = 5;
          item.value.idOdontograma = route.params.idOdontograma;
          item.value.estado = "pendiente";
          item.value.cantidad = Piezas.toString();
          let subtot = (Number(item.value.cantidad) * Number(item.value.precio));
          item.value.subtotal = subtot.toString();
          index = registro.value.findIndex(i => i.concepto == item.value.concepto);
          if (index == -1 || index == undefined) {
            guardar(item.value);
            item.value = {};
          } else {
            let existeregitro = registro.value.filter((elem) => elem.concepto == item.value.concepto);
            item.value.id = existeregitro[0].id;
            actualizar(item.value);
            item.value = {};
          }
        }
      }
    });
  }
}
</script>

<template lang="pug">
h2.primary-text 
  i.fa-solid.fa-clipboard-list.me-2
  span Cotizacion
.container.fluid
  .container
    .row.mt-4
      Form( :onFunction='() => guardarOActualizar()')
        .row
          .col
            label.input-group Concepto
            input.form-control(placeholder="Concepto" v-model="item.concepto", required)
          .col
            label.input-group Precio
            input.form-control(type="number" placeholder="Precio" v-model="item.precio",required :maxlength="maxDinero")
          .col.d-flex.justify-content-left.mt-3
            button.btn.btn-primary(type='submit') Agregar
            button.btn.btn-primary(@click="AddItemsAutomatico()") Obtener Diagnóstico
    .row
      .col.mt-1
        span#mensaje.fw-bold.text-danger
    .row
      .col.mt-4
        .div(style="background-color: white; border-radius: 2%;")
          table.table.table-hover
            thead
              tr
                th Concepto
                th.d-none.d-md-table-cell Cantidad
                th.d-none.d-md-table-cell Precio
                th.d-none.d-md-table-cell Sub total
                th.d-none.d-md-table-cell Estado
                th
            tbody
              tr(v-for="item of registro"  :key="item.id"  :item="item")
                td(width="10%" style="font-size: 14px") {{ item.concepto }}
                td {{ item.cantidad }}
                td S/. {{ item.precio }}.00 
                td S/. {{ item.subtotal }}.00 
                td(width="10%" style="font-size: 14px") {{ item.estado }} 
                td(width="20%")
                  BotonSeguro( :onSuccess= '() => eliminar(item.id)' )
                    i.fa.fa-trash-o(aria-hidden='true')
            tfoot
              tr
                th Total
                th
                th
                th  
                  span#TotalSuma.fw-bold
                th 
                th
.d-flex.mt-5
  button.btn.btn-primary(@click='push({ name: "pacienteVer", params: { idPaciente: route.params.idPaciente } })') Volver
</template>