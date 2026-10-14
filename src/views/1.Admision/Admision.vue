<script setup>
import { useRoute, useRouter} from "vue-router";
import Registro from './Registro.vue';
import Formulario from './Formulario.vue';

const {back, push} = useRouter()
</script>

<template lang="pug">
.row
  .col-7.col-md-9
    h1.my-0(style="color: var(--brand-navy); font-size: 1.5em") Admisión
    h1(style="color: var(--brand-blue); font-weight:bold; font-size: 1.5em") del paciente
    button.btn.btn-outline-primary.border-0(@click="back()" )
      i.bi.bi-arrow-left.fs-3
  .col-5.col-md-3.mt-5.mb-3
    div.opciones
      button.btn.btn-primary.white-text(title='Consentimientos' type='button' data-bs-toggle='modal' data-bs-target='#consentimientosModal')
        .contenido
          .title Consentimientos
        i.bi.bi-filetype-pdf.fs-3.icono
    #consentimientosModal.modal.fade(tabindex='-1')
      .modal-dialog.modal-lg
        .modal-content
          .modal-header
            h2 Lista de consentimientos en PDF
            button.btn-close(type='button' data-bs-dismiss='modal')
          .modal-body
            .row
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FApicectom%C3%ADa-corregida.pdf?alt=media&token=3b7d4f97-eb1b-47c6-96d4-d8f5c41d6fd4" target="_blank") Apicectomía corregida
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FCaninos-Retenidos.pdf?alt=media&token=d5e6d6b3-52bd-421a-a8dc-21766472a6a6" target="_blank") Caninos retenidos
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FCirug%C3%ADa-3era-molar.pdf?alt=media&token=e849d265-854b-48d6-a399-a3805b738897" target="_blank") Cirugía tercera molar
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FCirug%C3%ADa-Apical.pdf?alt=media&token=1f12d3ce-b835-4871-a6c1-fcbdbf08e5f7" target="_blank") Cirugía apical
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FCirug%C3%ADa-Bucal-Menor.pdf?alt=media&token=4e9f5008-3fc4-488a-84d2-1d32e7a1f684" target="_blank") Cirugía bucal menor
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FCirug%C3%ADa-Ortogn%C3%A1tica.pdf?alt=media&token=99c882fe-d73e-42e6-a0d8-65dcf8a27f97" target="_blank") Cirugía-Ortognática
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FENDODONCIA.pdf?alt=media&token=13e30065-1686-4aca-af6c-c995716ea764" target="_blank") Endodoncia
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FExodoncia-Simple.pdf?alt=media&token=1e3df2ce-371f-4b0e-94b1-56a292b6f693" target="_blank") Exodoncia-Simple
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FImplantes.pdf?alt=media&token=0fafb1f8-ac33-4c92-a301-38d975b677d3" target="_blank") Implantes
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FOperatoria.pdf?alt=media&token=42740794-fb1a-41ec-bc51-809958c4eb19" target="_blank") Obturaciónes
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FOrtodoncia.pdf?alt=media&token=e5956582-a6a8-4b1d-8683-2a743bb9a9a0" target="_blank") Ortodoncia
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FPeriodoncia.pdf?alt=media&token=48ac1f6b-a404-4998-8b4d-cb252a83363b" target="_blank") Periodoncia
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FPr%C3%B3tesis-Fija.pdf?alt=media&token=c6409c93-01eb-48be-ba23-50daa59a38fa" target="_blank") Prótesis-Fija
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FTercer-Molar.pdf?alt=media&token=832f4e65-bdcb-4bd5-9d0b-17f725fd687f" target="_blank") Tercer-Molar
              a(href="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/concentimientos%2FTratamiento-General.pdf?alt=media&token=c515bc94-32fe-44ad-b7f9-bdcbf7fe1be8" target="_blank") Rehabilitación oral
  Formulario

</template>
