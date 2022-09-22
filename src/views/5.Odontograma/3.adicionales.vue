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
      console.log(!isFileList || (isFileList && item.value[key].length == 0))
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
//const test = (item) => console.log(item)
</script>
<template lang="pug">
.row
  .col-10
    h1 Datos Adicionales
  .col-2
    button.btn(title='Ayuda' type='button' data-bs-toggle='modal' data-bs-target='#exampleModal')
      ion-icon(name="document-attach" style="color: var(--color-primary); font-size: 26px;" )
    #exampleModal.modal.fade(tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true')
      .modal-dialog.modal-lg
        .modal-content
          .modal-header
            h2 Lista de consentimientos en PDF
            button.btn-close(type='button' data-bs-dismiss='modal' aria-label='Close')
          .modal-body
            .row
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/images%2FApicectom%C3%ADa-corregida.pdf?alt=media&token=ceee9454-88f5-4602-a637-d714821af23a" target="_blank") Apicectomía corregida
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/images%2FCaninos-Retenidos.pdf?alt=media&token=d169d059-141a-4957-af5f-fe4e81e88cf9" target="_blank") Caninos retenidos
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/images%2FCirug%C3%ADa-3era-molar.pdf?alt=media&token=923591b3-7c97-4f3e-9e3d-391d563b6d84" target="_blank") Cirugía tercera molar
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/images%2FCirug%C3%ADa-Apical.pdf?alt=media&token=6bc710f9-9717-4f79-a4fd-33aa73c65480" target="_blank") Cirugía apical
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/images%2FCirug%C3%ADa-Bucal-Menor.pdf?alt=media&token=04182305-b832-46e6-9e2e-0981fa8f4a37" target="_blank") Cirugía bucal menor
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/images%2FCirug%C3%ADa-Ortogn%C3%A1tica.pdf?alt=media&token=ad08eb5c-07ec-43b4-a462-0ad23790d9d7" target="_blank") Cirugía-Ortognática
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/images%2FENDODONCIA.pdf?alt=media&token=1c2d726b-dd1a-42b7-8a4e-a29bc17c1af2" target="_blank") ENDODONCIA
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/images%2FExodoncia-Simple.pdf?alt=media&token=bf91fdc7-26ed-450b-bc1d-1df2cd6ff273" target="_blank") Exodoncia-Simple
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/images%2FImplantes.pdf?alt=media&token=4dba9b43-cacf-48c5-98ca-52833cf11b46" target="_blank") Implantes
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/images%2FOperatoria.pdf?alt=media&token=08ffa8df-edb3-4fee-961b-2011fdf3136b" target="_blank") Operatoria
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/images%2FOrtodoncia.pdf?alt=media&token=559defd2-c816-4443-994a-b072b65b4e62" target="_blank") Ortodoncia
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/images%2FPeriodoncia.pdf?alt=media&token=61f5bfb5-205e-4460-95f4-374e3beedcf8" target="_blank") Periodoncia
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/images%2FPr%C3%B3tesis-Fija.pdf?alt=media&token=d6e59510-ef84-4bc0-88cb-45abe2248382" target="_blank") Prótesis-Fija
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/images%2FTercer-Molar.pdf?alt=media&token=b0def9c2-2892-4ae5-8bcd-f1615a389218" target="_blank") Tercer-Molar
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/images%2FTratamiento-General.pdf?alt=media&token=23855904-0e68-4b6d-9c6d-b4b5842da495" target="_blank") Tratamiento-General


.row
  .col.m-2
    Form( :onPromise="() => crear_(item)" :onSuccess='()=>mensaje= "Actualizado con éxito"' :onCatch='(e) => mensaje = e') 
      .row
        label.form-label.mb-1 Especficaciones
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
        button.btn.btn-primary( @click='back()') Volver
        button.ms-auto.btn.btn-primary(type="submit") Guardar
    .card.card-body.mt-2
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
                  i.fa.fa-trash-o(aria-hidden='true')

</template>

<style lang="sass" scoped>

#myCanvas
  border: 1px solid #9c9898

</style>