<script setup>
import { onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { item, guardar, actualizar, leerEnRegistro, obtenerTodos, registro, limpiar }  from '../../store/planTratamiento.js'
const route = useRoute()
const { back } = useRouter()
const idPaciente = route.params.idPaciente
const agregarAlPlan = (item, idPaciente) => {
  return guardar(item, idPaciente)
};
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
    Form( :onPromise="() => agregarAlPlan(item, idPaciente)" :onSuccess= '() => limpiar()' )
      .row
        .col-6
          label.form-label.mb-1 Diagónsticos
          textarea.form-control( rows="6" v-model="item.planDiagnostico")
        .col-6
          label.form-label.mb-1 Comentario del plan de trabajo y presupuesto total
          textarea.form-control( rows="6" v-model="item.planTrabajo")
    Form( :onPromise="() => agregarAlPlan(item, idPaciente)" :onSuccess= '() => limpiar()' )
      .row.mt-2
        .col-6.col-md-4
          label.form-label() Tratamiento
          input.form-control(placeholder="Tratamiento" v-model="item.planTratamiento" maxlength="30")
        .col-6.col-md-4
          label.form-label() Fecha
          input.form-control(type="date" v-model="item.planFecha" maxlength="30")
        .col-6.col-md-4
          label.form-label() Hora
          input.form-control(placeholder="00:00" v-model="item.planHora" maxlength="30")
        .col-6.col-md-4
          label.form-label() Presupuesto
          input.form-control(placeholder="S/." v-model="item.planPresupuesto" maxlength="30")
        .col-6.col-md-4
          label.form-label() Adelanto
          input.form-control(placeholder="S/." v-model="item.planAdelanto" maxlength="30")
        .col-6.col-md-4
          label.form-label() Saldo
          input.form-control(placeholder="S/." v-model="item.planSaldo" maxlength="30")
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
              td {{ item.planTratamiento }}
              td {{ item.planFecha }}
              td {{ item.planHora }}
              td s/.{{ item.planPresupuesto }}
              td s/.{{ item.planAdelanto }}
              td s/.{{ item.planSaldo }}
              td
                BotonSeguro.mt-0( :onSuccess= '() => borrar(item)' :hidden="itemodontograma?.estado === '1' && !itemodontograma.idRelacionado")
                  i.fa.fa-trash-o(aria-hidden='true')
</template>