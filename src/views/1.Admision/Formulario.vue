<script setup>
import { onMounted, onUnmounted, watch, ref } from "vue";
import {item, guardar, actualizar, limpiar}  from '../../store/admision'
import { isLetter, isNumber } from '../../config/libreria'
const maxDocumento = ref(8);
const guardarOActualizar = () => {
  var alerta = document.getElementById("alerta");
  alerta.style.display = "none"
  if (item.value.id) return actualizar(item.value);
  else return guardar(item.value);
};
onMounted(() => {
  incompleto();
});
watch(
  () => item.value,
  () => {
    incompleto();
  }
);
function definirMaxLimit(tipoDocumento) {
  item.value.numeroDocumento = '';
  if (tipoDocumento == 'DNI') {
    maxDocumento.value = 8;
  } else {
    maxDocumento.value = 9;
  }
}
function incompleto() {
  var conErrores = '';
  conErrores = conErrores + ((item.value.numeroDocumento?.length < 8) ? ' Número documento incompleto,' : '');
  conErrores = conErrores + ((item.value.telefono?.length < 9) ? ' Telefono mínimo de 9 dígitos,' : '');
  var alerta = document.getElementById("alerta");
  if (alerta != null) {
    if (conErrores.length > 0) {
      alerta.innerHTML = "Te falta completar datos de: " + conErrores + "";
      alerta.style.display = "block"
      btguardar.disabled = true;
    }
    else {
      alerta.innerHTML = "";
      alerta.style.display = "none"
      btguardar.disabled = false;
    }
  }
  return conErrores;
}
</script>

<template lang="pug">

Form( :onPromise='() => guardarOActualizar()' :onSuccess='() => limpiar()' :onError='incompleto()')
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
        input.form-control(placeholder="Antecedentes familiares", v-model="item.antecedentesFam")
      .input.mb-2
        input.form-control(placeholder="Antecedentes personales", v-model="item.antecedentesPer")
      label.form-label Sígnos vitales
      .row.mb-2
        .col-6
          .input.mb-2
            input.form-control(placeholder="P.A.", v-model="item.pa")
          .input.mb-2
            input.form-control(placeholder="Pulso", v-model="item.pulso")
        .col-6
          .input.mb-2
            input.form-control(placeholder="Temperatura", v-model="item.temperatura")
          .input.mb-2
            input.form-control(placeholder="F.C.", v-model="item.fc")
        .col-6
          .input.mb-2
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
          input.form-control(placeholder="Tiempo de enfermedad", v-model="item.tiempoEnfermedad")
        .input.mb-2
          input.form-control(placeholder="Signos y síntomas principales", v-model="item.signosYSintomas")
        .input.mb-2
          input.form-control(placeholder="Relato cronológico", v-model="item.relatoCronologico")
        .input.mb-2
          input.form-control(placeholder="Funciones biológicas", v-model="item.funcionesBio")
    .col-6
      .row
        .col.mb-2
          label.form-label Exámen clínico general
          select.form-select(placeholder="Exámen clínico general", v-model="item.examClinicoGeneral")
            option(value="S") SI
            option(value="N") NO
        .col.mb-2
          label.form-label Exámen odontoestomatológico
          select.form-select(placeholder="Exámen clínico odontoestomatológico", v-model="item.examClinicoOdonto")
            option(value="S") SI
            option(value="N") NO
    .col-6
      label.form-label Viajes de los últimos años
      .input-group
        input.form-control(placeholder="Motivo de consulta", v-model="item.viajesUltimos")

  .col-12.col-md-4.mx-auto.mt-3
    button#btguardar.w-100.text-white.text-start.btn.btn-primary.d-flex.justify-content-between.px-5.align-items-center(
      type='submit', disabled style="border-radius: 50px"
    )
      span
        small
          strong Registrar
        p.mb-0 Admisión
      i.fa-solid.fa-save.fa-lg.ms-5(style=" color: white;")
  .row.mt-2
    #alerta.alert.alert-danger.alert-dismissible(style='display:none')   
      strong Cuidado! te falta completar campos
</template>

