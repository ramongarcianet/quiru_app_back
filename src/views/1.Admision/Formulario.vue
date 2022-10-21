<script setup>
import { useRoute, useRouter } from "vue-router";
import { item, guardar, actualizar, leerEnRegistro, obtenerTodos, registro }  from '../../store/admision.js'
const route = useRoute()
const { back } = useRouter()
const idPaciente = route.params.idPaciente
const guardarOActualizar = (item, idPaciente) => {
  if (item.id) return actualizar(item, idPaciente);
  else return guardar(item, idPaciente);
};

obtenerTodos(route.params.idPaciente) 
</script>

<template lang="pug">


Form( :onPromise='() => guardarOActualizar(item, idPaciente)' :onSuccess='() => back()')
  .row
    .col-md-6
      label.form-label Ocupación
      .input.mb-2
        input.form-control(placeholder="Ocupación", v-model="item.ocupacion")
      label.form-label Número de emergencia
      .input.mb-2
        input.form-control(placeholder="Número de emergencía", v-model="item.numeroEmergencia")
      label.form-label Antecedentes
      .input.mb-2
        h5.form-label Familiares
        input.form-control(placeholder="Antecedentes familiares", v-model="item.antecedentesFam")
      .input.mb-2
        h5.form-label Familiares
        input.form-control(placeholder="Antecedentes personales", v-model="item.antecedentesPer")
      label.form-label Sígnos vitales
      .row.mb-2
        .col.d-flex
          span.input-group-text.mb-1(style="padding: .01rem .01rem .01rem .6rem;") Temperatura:
            input.form-control(placeholder="Temperatura", v-model="item.temperatura")
        .col.d-flex
          span.input-group-text.mb-1(style="padding: .01rem .01rem .01rem .6rem;") Pulso:
            input.form-control(placeholder="Pulso", v-model="item.pulso")
      .row
        .col.d-flex
          span.input-group-text.mb-1(style="padding: .01rem .01rem .01rem .6rem;") P.A:
            input.form-control(placeholder="P.A.", v-model="item.pa")
        .col.d-flex
          span.input-group-text.mb-1(style="padding: .01rem .01rem .01rem .6rem;") F.C:
            input.form-control(placeholder="F.C.", v-model="item.fc")
        .col.d-flex
          span.input-group-text.mb-1(style="padding: .01rem .01rem .01rem .6rem;") F.R:
            input.form-control(placeholder="F.Resp.", v-model="item.fResp")
    .col-md-6
      label.form-label Procedencia
      .input.mb-2
        input.form-control(placeholder="Procedencia", v-model="item.procedencia")
      .col.mb-2
        label.form-label Motivo de consulta
        .input-group
          input.form-control(placeholder="Motivo de consulta", v-model="item.motivoConsulta")
      .col.mb-2
        label.form-label Enfermadad actual
        .input.mb-2
          input.form-control(placeholder="Enfermadad actual", v-model="item.enfermedadActual")
        .input.mb-2
          h6.form-label Tiempo de enfermedad
          input.form-control(placeholder="Tiempo de enfermedad", v-model="item.tiempoEnfermedad")
        .input.mb-2
          h6.form-label Signos y síntomas principales
          input.form-control(placeholder="Signos y síntomas principales", v-model="item.signosYSintomas")
        .input.mb-2
          h6.form-label Relato cronológico
          input.form-control(placeholder="Relato cronológico", v-model="item.relatoCronologico")
        .input.mb-2
          h6.form-label Funciones biológicas
          input.form-control(placeholder="Funciones biológicas", v-model="item.funcionesBio")
    .col-6
      .row
        .col.mb-2
          label.form-label Exámen clínico general
          .input.mb-2
            input.form-control(placeholder="Exámen clínico general", v-model="item.examClinicoGeneral")
        .col.mb-2
          label.form-label Exámen odontoestomatológico
          .input.mb-2
            input.form-control(placeholder="Exámen odontoestomatológico", v-model="item.examClinicoOdonto")
    .col-6
      label.form-label Viajes de los últimos años
      .input-group
        input.form-control(placeholder="Motivo de consulta", v-model="item.viajesUltimos")
  .col-12.col-md-4.mx-auto.mt-3
    button.w-100.text-white.text-start.btn.btn-primary.d-flex.justify-content-between.px-5.align-items-center(
      type='submit', style="border-radius: 50px"
    )
      span
        small
          strong Guardar
        p.mb-0 Admisión
      i.fa-solid.fa-save.fa-lg.ms-5(style=" color: white;")
</template>

