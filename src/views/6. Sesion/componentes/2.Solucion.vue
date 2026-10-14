<script setup>
import { useRouter } from "vue-router";

const { push } = useRouter();

let beneficios = [
  {
    beneficio: "Asistente de voz para diagnóstico",
    descripcion: "Mientras atiendes, el asistente de voz se encarga de los odontogramas",
    icono:
      "https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FAsistente-de-voz.webp?alt=media&token=e8ca81fb-bed4-489d-a115-34cc92090bfc",
  },
  {
    beneficio: "Odontogramas bajo los estándares",
    descripcion: "QUIRU Dent AI registra odontogramas bajo la norma actual",
    icono:
      "https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FOdontogramas-_1_.webp?alt=media&token=d0cac0ed-5a0b-46f1-9896-1b47507990b1",
  },
  {
    beneficio: "Información a mano",
    descripcion: "Con QUIRU Dent AI, adiós al papeleo. Registros ordenados y disponibles las 24 horas en tu celular.",
    icono:
      "https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fevitar-perdida-de-informacion.webp?alt=media&token=b3c6d1ca-7b90-4d94-9f9d-7f55d4125e6b",
  },
  {
    beneficio: "Gestiona tus pacientes",
    descripcion: "Ubica tus pacientes de forma organizada, rápida y sencilla",
    icono:
      "https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fgestion-pacientes.webp?alt=media&token=b7af13fd-834c-4945-9d53-c9e71bc59370",
  },
  {
    beneficio: "Consulta historias clínicas",
    descripcion: "Obtén los datos e información de tus pacientes en el momento ideal.",
    icono:
      "https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fhistorias-clinicas.webp?alt=media&token=f4b99332-0b76-47d7-880a-a797871beff6",
  },
  
];
</script>
<template lang="pug">
                      
#beneficios.container-fluid.my-5
    .container
        .row
            .col-12.col-md-5.d-flex.flex-column.justify-content-start.beneficios
                h1.primary-text Beneficios por usar  
                    span.dark-text QUIRU Dent AI
                span Tu nuevo asistente de voz que reduce un 75% en toma de datos para el registro de odontogramas
        .row
            .col-12.col-md-6.h-100.d-flex.align-items-end.mt-5
                Img.w-100(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FGroup-74-_2_.webp?alt=media&token=3e4e327a-4ab1-47ad-8ad5-0b6eda3c8825")
            .col-12.col-md-6.mt-5
                ul
                    li.d-flex.align-items-center.mb-4(v-for='i of beneficios')
                        Img.me-3(:src='i.icono' width='50')
                        div
                            h2.m-0.primary-text {{i.beneficio}}
                            p.m-0 {{i.descripcion}}

</template>
<style lang="sass" scoped>

button
    padding: 1rem

.container-fluid
    padding-top: 7rem
</style>
