<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { actualizar,leerOdonto,item, funcionPlan} from "../../store/formodontograma";
import { onMounted } from "@vue/runtime-core";
import InputFile from "../../components/FileInput.vue";
import { registro_ as _hallazgosPag } from "../../config/Paginator";
const { push, back } = useRouter();
const route = useRoute()
if (route.params.idOdontograma) {
  leerOdonto(route.params.idOdontograma)
}

const itemPlan = ref({
  planTratamiento: '',
  planFecha: '',
  planHora: '',
  planPresupuesto: '',
  planAdelanto: '',
  planSaldo: '',
})
const agregarAlPlan = () => {
  console.log(itemPlan.value)
  return funcionPlan(itemPlan.value, item.value.id )
}

const eliminarDelPlan = () => {
}
</script>
<template lang="pug">
.row
  .col-8
    h1 Datos del plan de tratamiento
    button.btn.btn-outline-primary.border-0(@click="back()" )
      i.fa-solid.fa-arrow-left-long.fa-xl
.row
  .col.m-2
    Form( :onPromise="() => agregarAlPlan(itemPlan)" ) 
      .row
        label.form-label.mb-1 Diagónsticos
        textarea.form-control( rows="4" v-model="itemPlan.planDiagnostico")
      .row.mt-2
        label.form-label.mb-1 Plan de trabajo y presupuesto total
        textarea.form-control( rows="4" v-model="itemPlan.planTrabajo")
      .row.mt-2
        .col-6.col-md-4
          label.form-label() Tratamiento
          input.form-control(placeholder="Tratamiento" v-model="itemPlan.planTratamiento" maxlength="30")
        .col-6.col-md-4
          label.form-label() Fecha
          input.form-control(type="date" v-model="itemPlan.planFecha" maxlength="30")
        .col-6.col-md-4
          label.form-label() Hora
          input.form-control(placeholder="00:00" v-model="itemPlan.planHora" maxlength="30")
        .col-6.col-md-4
          label.form-label() Presupuesto
          input.form-control(placeholder="S/." v-model="itemPlan.planPresupuesto" maxlength="30")
        .col-6.col-md-4
          label.form-label() Adelanto
          input.form-control(placeholder="S/." v-model="itemPlan.planAdelanto" maxlength="30")
        .col-6.col-md-4
          label.form-label() Saldo
          input.form-control(placeholder="S/." v-model="itemPlan.planSaldo" maxlength="30")
      .d-flex.mt-2
        button.ms-auto.btn.btn-primary(type="submit") Añadir
    .card.card-body.mt-2
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
          tbody(style="cursor: pointer;")
            tr(v-for="itemPlan of nada")
              td {{ itemPlan.fila }}
              td {{ itemPlan.descripcion }}
              td {{ itemPlan.diente }}
              td {{ itemPlan.dienteAlterno }}
              td {{ itemPlan.fechaHallazgo }}
              td {{ itemPlan.hallazgo }}
              td {{ itemPlan.sigla }}
              td
                BotonSeguro.mt-0( :onSuccess= '() => eliminarDelPlan()' )
                  i.fa.fa-trash-o

</template>

<style lang="sass" scoped>
.opciones
  margin-left: auto
  margin-right: auto
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  width: 100%
  height: auto
  .outline-quiru
    width: 100%
    height: 75px
    border-radius: 50px
    border: 1px solid var(--color-primary)
    background-color: transparent
    display: flex
    flex-direction: row
    justify-content: space-around
    align-items: center
    &.solid
      background-color: var(--color-primary)
    &.disabled
      border: none
      background-color: gray
      
    .contenido
      display: flex
      flex-direction: column
      align-items: start
      justify-content: start
      width: 150px
      .title
        font-weight: 700
        color: var(--color-primary)

        &.light-quiru
          color: var(--color-white)
          background: transparent
      .subtitle
        font-weight: 400
        color: var(--color-primary)
        &.light-quiru
          color: var(--color-white)
    .icono
      font-size: 26px
      color: var(--color-primary)
      &.light-quiru
        color: var(--color-white)

#myCanvas
  border: 1px solid #9c9898

</style>