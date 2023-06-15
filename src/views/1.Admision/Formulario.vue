<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { item, guardar, actualizar, leerEnRegistro, obtenerTodos, registro }  from '../../store/admision.js'
import {progressFile, setFile, borrarFile } from '../../store/storage.js';
import InputFile from "../../components/FileInput.vue";

const route = useRoute()
const { back } = useRouter()
const idPaciente = route.params.idPaciente
const guardarOActualizar = (item, idPaciente) => {
  if (item.id) return actualizarDOC(item);
  else return guardar(item, idPaciente);
};
const eliminarDelDocumento = (file, i) => {
  item.value.archivos.splice(i, 1)
  borrarFile(file)
  actualizar(item.id)
}
obtenerTodos(route.params.idPaciente)
const mensaje = ref('')
const hayError = ref(false)
const actualizarDOC = () => new Promise( async(resolve, reject) =>   { 
  try {
    mensaje.value = ''
    const keys = Object.keys(item.value)
    for ( let key of keys ){
      const isFileList = item.value[key] instanceof FileList
      if( isFileList && item.value[key].length > 0){
      const listaDeUrl = []
      const length = item.value[key].length
      const listaDeImagenes = []
      for ( let i = 0; i<length; i++){
        listaDeImagenes.push(item.value[key][i])
      }
      for await( let item of listaDeImagenes ) {
        const url = await setFile(item, idPaciente) 
        listaDeUrl.push(url)
      }
      item.value[key] = null
      item.value.archivos = item.value.archivos
                              ? [...item.value.archivos, ...listaDeUrl] 
                              : [...listaDeUrl]
    }
    }
    await actualizar(item.value)
    progressFile.value = 0
    hayError.value=false
    resolve()
  }
  catch (e ){ 
    hayError.value=true
    reject(e)
  }
})
</script>

<template lang="pug">


Form( :onPromise='() => guardarOActualizar(item, idPaciente)' :onSuccess='() => back()')
  .row
    .col-md-6
      .col.mb-1
        span.input-group-text.mb-1(style="background-color: var(--color-light); font-weight: bold; color:rgb(57, 93, 86);") Datos Generales del Paciente
      .col.mb-1
        span(style="padding: .01rem .01rem .01rem .6rem;") Ocupación :
        input.form-control(placeholder="", v-model="item.ocupacion")
      .col.mb-1
        span(style="padding: .01rem .01rem .01rem .6rem;") Procedencia :
        input.form-control(placeholder="", v-model="item.procedencia")
      .col.mb-1
        span(style="padding: .01rem .01rem .01rem .6rem;") Número de emergencia :
        input.form-control(placeholder="", v-model="item.numeroEmergencia")
      .col.mb-1
        span(style="padding: .01rem .01rem .01rem .6rem;") Viajes de los últimos años :
        input.form-control(placeholder="", v-model="item.viajesUltimos")
      .col.mb-1
        span.input-group-text.mb-1(style="background-color: var(--color-light); font-weight: bold; color:rgb(57, 93, 86);") Antecedentes
      .col.mb-1
        span(style="padding: .01rem .01rem .01rem .6rem;") Familiares :
        input.form-control(placeholder="", v-model="item.antecedentesFam")
      .col.mb-1
        span(style="padding: .01rem .01rem .01rem .6rem;") Personales :
        input.form-control(placeholder="", v-model="item.antecedentesPer")
      .col.mb-1
        span.input-group-text.mb-1(style="background-color: var(--color-light); font-weight: bold; color:rgb(57, 93, 86);") Signos vitales
      .col.mb-1
        span(style="padding: .01rem .01rem .01rem .6rem;") Temperatura :     
        input.form-control(placeholder="", v-model="item.temperatura" maxlength="2")
      .col.mb-1
        span(style="padding: .01rem .01rem .01rem .6rem;") Pulso :
        input.form-control(placeholder="", v-model="item.pulso" maxlength="3")
      .col.mb-1
        span(style="padding: .01rem .01rem .01rem .6rem;") P.A :
        input.form-control(placeholder="", v-model="item.pa" maxlength="3")
      .col.mb-1
        span(style="padding: .01rem .01rem .01rem .6rem;") F.C :
        input.form-control(placeholder="", v-model="item.fc" maxlength="3")
      .col.mb-1
        span(style="padding: .01rem .01rem .01rem .6rem;") F.R :
        input.form-control(placeholder="", v-model="item.fResp" maxlength="2")
    .col-md-6
      .col.mb-1
        span.input-group-text.mb-1(style="background-color: var(--color-light); font-weight: bold; color:rgb(57, 93, 86);") Datos de la consulta  
      .col.mb-1
        span(style="padding: .01rem .01rem .01rem .6rem;") Motivo :
        input.form-control(placeholder="", v-model="item.motivoConsulta")
      .col.mb-1
        span(style="padding: .01rem .01rem .01rem .6rem;") Enfermedad actual :
        input.form-control(placeholder="", v-model="item.enfermedadActual")
      .col.mb-1
        span(style="padding: .01rem .01rem .01rem .6rem;") Tiempo de enfermedad :
        input.form-control(placeholder="", v-model="item.tiempoEnfermedad")
      .col.mb-1
        span(style="padding: .01rem .01rem .01rem .6rem;") Signos y síntomas principales :
        input.form-control(placeholder="", v-model="item.signosYSintomas")
      .col.mb-1
        span(style="padding: .01rem .01rem .01rem .6rem;") Relato cronológico :
        input.form-control(placeholder="", v-model="item.relatoCronologico")
      .col.mb-1
        span(style="padding: .01rem .01rem .01rem .6rem;") Funciones biológicas :
        input.form-control(placeholder="", v-model="item.funcionesBio")
      .col.mb-1
        span(style="padding: .01rem .01rem .01rem .6rem;") Examen clínico general :
        input.form-control(placeholder="", v-model="item.examClinicoGeneral")
      .col.mb-1
        span(style="padding: .01rem .01rem .01rem .6rem;") Examen odontoestomatológico
        input.form-control(placeholder="", v-model="item.examClinicoOdonto")
    .row.mt-2
      InputFile(v-model='item.files')
      .progress( v-if='progressFile')
        .progress-bar(role="progressbar" :style="`width: ${progressFile}%;`" ) {{progressFile.toFixed(0)}} %
    .row.mt-2
      #mensaje.alert.alert-dismissible( v-if='mensaje' :class='hayError? "alert-danger" : "alert-success" ' ) {{mensaje}}
  .col-12.col-md-4.mx-auto.mt-3.mb-5
    button.w-100.text-white.text-start.btn.btn-primary.d-flex.justify-content-between.px-5.align-items-center(
      type='submit', style="border-radius: 50px"
    )
      span
        small
          strong Guardar
        p.mb-0 Admisión
      i.fa-solid.fa-save.fa-lg.ms-5(style=" color: white;")
.card.card-body.mt-2(style="margin-bottom: 50px")
  .div(style="background-color: white; border-radius: 2%;")
    table.table.table-hover
      thead
        tr
          th Adjuntos
          th Tipo
          th
      tbody(style="cursor: pointer;")
        tr( v-for='file, i of item.archivos' :key='`item-${i}`')
          StorageItem( :storageRef='file')
          td.ms-3
            BotonSeguro( :onSuccess= '() => eliminarDelDocumento(file, i)' )
              i.fa.fa-trash-o
</template>

