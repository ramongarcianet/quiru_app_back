<script setup>
import { onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { item, guardar, actualizar, leerEnRegistro, obtenerTodos, registro, limpiar }  from '../../store/planTratamiento.js'
const route = useRoute()
const { back } = useRouter()
const idOdontograma = route.params.idOdontograma
const tipoOdontograma = route.params.tipoOdonto
const agregarAlPlan = (item) => {
  return guardar(item)
};
if(tipoOdontograma === 'Diagnóstico') {
  console.log('estamos en un diag')
  }else{
    console.log('estamos en un trata')
  }
obtenerTodos()
</script>
<template lang="pug">
.row
  .col-8
    h1 Datos del plan de tratamiento
    button.btn.btn-outline-primary.border-0(@click="back()" )
      i.fa-solid.fa-arrow-left-long.fa-xl
.row
  .col.m-2
    Form( :onPromise="() => agregarAlPlan(item)" :onSuccess= '() => limpiar()' )
      .row
        .col-6
          label.form-label.mb-1 Diagónsticos
          textarea.form-control( rows="6" v-model="item.descripDiagnostico")
        .col-6
          label.form-label.mb-1 Comentario del plan de trabajo y presupuesto total
          textarea.form-control( rows="6" v-model="item.descripPlan")
      .row.mt-2
        .col-6.col-md-4
          label.form-label() Tratamiento
          input.form-control(placeholder="Tratamiento" v-model="item.tratamiento" maxlength="30")
        .col-6.col-md-4
          label.form-label() Fecha
          input.form-control(type="date" v-model="item.fecha" maxlength="30")
        .col-6.col-md-4
          label.form-label() Hora
          input.form-control(placeholder="00:00" v-model="item.hora" maxlength="30")
        .col-6.col-md-4
          label.form-label() Presupuesto
          input.form-control(placeholder="S/." v-model="item.presupuesto" maxlength="30")
        .col-6.col-md-4
          label.form-label() Adelanto
          input.form-control(placeholder="S/." v-model="item.adelanto" maxlength="30")
        .col-6.col-md-4
          label.form-label() Saldo
          input.form-control(placeholder="S/." v-model="item.saldo" maxlength="30")
      .d-flex.mt-2
        button.ms-auto.btn.btn-primary(type="submit") Añadir al plan
        
.card.card-body
      .div(style="background-color: white; border-radius: 2%;")
        table.table.table-hover
          thead
            tr
              th N°
              th Tratamiento
              th Fecha
              th Hora
              th Presupuesto
              th Adelanto
              th Saldo
              th
          tbody
            tr(v-for="item of registro")
              td {{ item.order }} -
              td {{ item.tratamiento }}
              td {{ item.fecha }}
              td {{ item.hora }}
              td s/.{{ item.presupuesto }}
              td s/.{{ item.adelanto }}
              td s/.{{ item.saldo }}
              td
                BotonSeguro.mt-0( :onSuccess= '() => borrar(item)' :hidden="itemodontograma?.estado === '1' && !itemodontograma.idRelacionado")
                  i.fa.fa-trash-o
</template>