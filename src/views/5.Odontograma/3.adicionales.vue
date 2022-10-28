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
//const test = (item) => console.log(item)
</script>
<template lang="pug">
.row
  .col-10
    h1 Datos Adicionales
  .col-2
    button.btn(title='Ayuda' type='button' data-bs-toggle='modal' data-bs-target='#exampleModal')
      i.fa-regular.fa-file-pdf.fa-xl( style="color: var(--color-primary); font-size: 35px" )
    #exampleModal.modal.fade(tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true')
      .modal-dialog.modal-lg
        .modal-content
          .modal-header
            h2 Lista de consentimientos en PDF
            button.btn-close(type='button' data-bs-dismiss='modal' aria-label='Close')
          .modal-body
            .row
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FApicectom%C3%ADa-corregida.pdf?alt=media&token=3b7d4f97-eb1b-47c6-96d4-d8f5c41d6fd4" target="_blank") Apicectomía corregida
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FCaninos-Retenidos.pdf?alt=media&token=d5e6d6b3-52bd-421a-a8dc-21766472a6a6" target="_blank") Caninos retenidos
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FCirug%C3%ADa-3era-molar.pdf?alt=media&token=e849d265-854b-48d6-a399-a3805b738897" target="_blank") Cirugía tercera molar
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FCirug%C3%ADa-Apical.pdf?alt=media&token=1f12d3ce-b835-4871-a6c1-fcbdbf08e5f7" target="_blank") Cirugía apical
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FCirug%C3%ADa-Bucal-Menor.pdf?alt=media&token=4e9f5008-3fc4-488a-84d2-1d32e7a1f684" target="_blank") Cirugía bucal menor
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FCirug%C3%ADa-Ortogn%C3%A1tica.pdf?alt=media&token=99c882fe-d73e-42e6-a0d8-65dcf8a27f97" target="_blank") Cirugía-Ortognática
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FENDODONCIA.pdf?alt=media&token=13e30065-1686-4aca-af6c-c995716ea764" target="_blank") ENDODONCIA
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FExodoncia-Simple.pdf?alt=media&token=1e3df2ce-371f-4b0e-94b1-56a292b6f693" target="_blank") Exodoncia-Simple
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FImplantes.pdf?alt=media&token=0fafb1f8-ac33-4c92-a301-38d975b677d3" target="_blank") Implantes
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FOperatoria.pdf?alt=media&token=42740794-fb1a-41ec-bc51-809958c4eb19" target="_blank") Operatoria
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FOrtodoncia.pdf?alt=media&token=e5956582-a6a8-4b1d-8683-2a743bb9a9a0" target="_blank") Ortodoncia
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FPeriodoncia.pdf?alt=media&token=48ac1f6b-a404-4998-8b4d-cb252a83363b" target="_blank") Periodoncia
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FPr%C3%B3tesis-Fija.pdf?alt=media&token=c6409c93-01eb-48be-ba23-50daa59a38fa" target="_blank") Prótesis-Fija
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FTercer-Molar.pdf?alt=media&token=832f4e65-bdcb-4bd5-9d0b-17f725fd687f" target="_blank") Tercer-Molar
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FTratamiento-General.pdf?alt=media&token=c515bc94-32fe-44ad-b7f9-bdcbf7fe1be8" target="_blank") Tratamiento-General


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
        button.btn.btn-primary( @click="push({name: 'Detalle', params: {idOdontograma:route.params.idOdontograma ,idPaciente: route.params.idPaciente,tipoOdonto: route.params.tipoOdonto} })") Volver
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