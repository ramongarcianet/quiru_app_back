<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { actualizar,leerOdonto,item} from "../../store/formodontograma";
import { onMounted } from "@vue/runtime-core";
import InputFile from "../../components/FileInput.vue";
import {progressFile, setFile, borrarFile } from '../../store/storage.js';
const { push, back } = useRouter();
const route = useRoute()
if (route.params.idOdontograma) {
  leerOdonto(route.params.idOdontograma)
}
const eliminarDelDocumento = (file, i) => {
  
  item.value.archivos.splice(i, 1)
  borrarFile(file)
  actualizar(route.params.idOdontograma)
}
const mensaje = ref('')
const hayError = ref(false)
const crear_ = () => new Promise( async(resolve, reject) =>   { 
  try {
    mensaje.value = ''

    const keys = Object.keys(item.value)
    for ( let key of keys ){
      const isFileList = item.value[key] instanceof FileList
      //console.log(!isFileList || (isFileList && item.value[key].length == 0))
      if( isFileList && item.value[key].length > 0){
      const listaDeUrl = []
      const length = item.value[key].length
      const listaDeImagenes = []
      for ( let i = 0; i<length; i++){
        listaDeImagenes.push(item.value[key][i])
      }
      for await( let item of listaDeImagenes ) {
        const url = await setFile(item, route.params.idOdontograma) 
        listaDeUrl.push(url)
      }
      item.value[key] = null
      item.value.archivos = item.value.archivos
                              ? [...item.value.archivos, ...listaDeUrl] 
                              : [...listaDeUrl]
    }
    }
    await actualizar(route.params.idOdontograma)
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
.row
  .col-7.col-md-9
    h1 Datos 
    h1 Adicionales
    button.btn.btn-outline-primary.border-0(@click="back()" )
      i.bi.bi-arrow-left.fs-3
.row
  .col.m-2
    Form( :onPromise="() => crear_(item)" :onSuccess='()=>mensaje= "Actualizado con éxito"' :onCatch='(e) => mensaje = e') 
      .row
        label.form-label.mb-1 Especificaciones
        textarea.form-control( rows="4" v-model="item.especificaciones")
      .row.mt-2
        label.form-label.mb-1 Observaciones
        textarea.form-control( rows="4" v-model="item.observaciones" )
      .row.mt-2
        label.form-label.mb-1 Receta
        textarea.form-control( rows="4" v-model="item.receta")
      .row.mt-2
        InputFile(v-model='item.files')
        .progress( v-if='progressFile')
          .progress-bar(role="progressbar" :style="`width: ${progressFile}%;`" ) {{progressFile.toFixed(0)}} %
      .row.mt-2
        #mensaje.alert.alert-dismissible( v-if='mensaje' :class='hayError? "alert-danger" : "alert-success" ' ) {{mensaje}}
      .d-flex.mt-2
        button.ms-auto.btn.btn-primary(type="submit") Guardar
    .card.card-body.mt-2(style="margin-bottom: 50px")
      .div(style="background-color: white; border-radius: 2%;")
        table.table.table-hover
          thead(style="border-radius: 30px; background-color:var(--color-light) !important;")
            tr
              th Adjuntos
              th Tipo
              th
          tbody(style="cursor: pointer;")
            tr( v-for='file, i of item.archivos' :key='`item-${i}`')
              
              StorageItem( :storageRef='file')
            
              td.ms-3
                BotonSeguro( :onSuccess= '() => eliminarDelDocumento(file, i)' )
                  i.bi.bi-trash(aria-hidden='true')

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
  border: 1px solid #212529

</style>
