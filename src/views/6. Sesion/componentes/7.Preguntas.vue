<script setup>
import { useRouter } from "vue-router";

const {push} = useRouter()

let beneficios = [
    { beneficio: "Gestiona tus pacientes", descripcion: "Maneja la lista de tus pacientes de forma rápida y sencilla",    icono:"https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fgestion-pacientes.webp?alt=media&token=b7af13fd-834c-4945-9d53-c9e71bc59370"},
    { beneficio: "Maneja historias clínicas", descripcion: "Obtén los datos e información de tus pacientes",    icono:"https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fhistorias-clinicas.webp?alt=media&token=f4b99332-0b76-47d7-880a-a797871beff6"},
    { beneficio: "Asistente de voz", descripcion: "LLenar a mano está en el pasado, tu asistente de voz se encarga",    icono:"https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FAsistente-de-voz.webp?alt=media&token=e8ca81fb-bed4-489d-a115-34cc92090bfc"},
    { beneficio: "Llenado de odontogramas", descripcion: "Quiru se encarga de llenar de forma automática los odontogramas",    icono:"https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FOdontogramas-_1_.webp?alt=media&token=d0cac0ed-5a0b-46f1-9896-1b47507990b1"},
    { beneficio: "Evita perdidas de información", descripcion: "Con quiru no tendrás que manejar tanto papeleo, todo en un solo lugar",    icono:"https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fevitar-perdida-de-informacion.webp?alt=media&token=b3c6d1ca-7b90-4d94-9f9d-7f55d4125e6b"},

]
</script>
<template lang="pug">
                
.container-fluid.pt-5.pb-3
    .container.mb-5
        .row
            .col-12.col-md-8.d-flex.flex-column.justify-content-center.align-items-start.beneficios
                ul.m-0.p-0
                    li.beneficios.d-flex.align-items-center.mb-4
                        h1.dark-text Te gustaria usar quiru, pero aun tienes   
                            span dudas 
                        img.ms-3( width='60' src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fevitar-perdida-de-informacion.webp?alt=media&token=b3c6d1ca-7b90-4d94-9f9d-7f55d4125e6b")
                span Agenda una breve reunión con nosotros para resolver todas tus dudas,  con confianza. Atendemos todas las consultas que tengas.
                button.mt-5 conversemos
            .col-12.col-md-4.h-100.d-flex.align-items-end.mt-5
                .row.justify-content-center.align-items-center
                    .col-6
                        img.w-100(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FComponent_2_1_.webp?alt=media&token=8740ea24-eef3-468f-969b-50cc4a6ff35c")                                            
    slot
</template>

<style scoped lang="sass">

.container-fluid
    padding-top: 5rem
    background: linear-gradient(to bottom, rgba(255,255,255,1) 39%, rgba(190,245,234,1) 87%)

</style>
