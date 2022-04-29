<script setup>
import { useRouter } from "vue-router";

const { push } = useRouter();

let beneficios = [
  {
    beneficio: "Gestiona tus pacientes",
    descripcion: "Maneja la lista de tus pacientes de forma rápida y sencilla",
    icono:
      "https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fgestion-pacientes.webp?alt=media&token=b7af13fd-834c-4945-9d53-c9e71bc59370",
  },
  {
    beneficio: "Maneja historias clínicas",
    descripcion: "Obtén los datos e información de tus pacientes",
    icono:
      "https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fhistorias-clinicas.webp?alt=media&token=f4b99332-0b76-47d7-880a-a797871beff6",
  },
  {
    beneficio: "Asistente de voz",
    descripcion: "LLenar a mano está en el pasado, tu asistente de voz se encarga",
    icono:
      "https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FAsistente-de-voz.webp?alt=media&token=e8ca81fb-bed4-489d-a115-34cc92090bfc",
  },
  {
    beneficio: "Llenado de odontogramas",
    descripcion: "Quiru se encarga de llenar de forma automática los odontogramas",
    icono:
      "https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FOdontogramas-_1_.webp?alt=media&token=d0cac0ed-5a0b-46f1-9896-1b47507990b1",
  },
  {
    beneficio: "Evita perdidas de información",
    descripcion: "Con quiru no tendrás que manejar tanto papeleo, todo en un solo lugar",
    icono:
      "https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fevitar-perdida-de-informacion.webp?alt=media&token=b3c6d1ca-7b90-4d94-9f9d-7f55d4125e6b",
  },
];
</script>
<template lang="pug">
                      
#beneficios.container-fluid.my-5
    .container
        .row
            .col-12.col-md-5.d-flex.flex-column.justify-content-start.beneficios
                h1.primary-text Beneficios por  
                    span.dark-text usar Quiru
                span Tu nuevo asistente virtual reduce hasta un 75% en toma de datos en el registro de odontogramas, con ello te puedes enfocar en atender más pacientes    
        .row
            .col-12.col-md-6.h-100.d-flex.align-items-end.mt-5
                img.w-100(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FGroup-74-_2_.webp?alt=media&token=3e4e327a-4ab1-47ad-8ad5-0b6eda3c8825")
            .col-12.col-md-6.mt-5
                ul
                    li.d-flex.align-items-center.mb-4(v-for='i of beneficios')
                        img.me-3(:src='i.icono' width='50')
                        div
                            h2.m-0.primary-text {{i.beneficio}}
                            p.m-0 {{i.descripcion}}

</template>
<style lang="sass" scoped>
.container-fluid
    padding-top: 7rem
</style>
