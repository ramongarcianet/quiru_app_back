<script setup>
import { useRouter } from 'vue-router';
import marketing from '../../../store/marketing';
//const {registrarEvento} = marketing
const {push} = useRouter()
</script>
<template lang="pug">
                  
.container-fluid.my-5
    .container
        .row.flex-column-reverse.flex-md-row
            .col-12.col-md-7.h-100.d-flex.align-items-start
                Img.w-100(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FAdmisi195179n_1_.webp?alt=media&token=f8d83ba7-db19-4b23-9388-8eda84873db7")
            .col-12.col-md-5.d-flex.flex-column.justify-content-center.align-items-start
                ul.m-0.p-0
                    li.d-flex.align-items-center.mb-4
                        h1.primary-text Gestión de tus 
                            span.dark-text pacientes 
                        Img.ms-3( width='60' src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fgestion-pacientes.webp?alt=media&token=b7af13fd-834c-4945-9d53-c9e71bc59370")
                span La agenda o el archivador quedaron atrás, ten el control total de tus pacientes. Consulta tu información en un solo panel y empieza tu consulta en el acto para que tu puedas enfocarte en brindar el mejor servicio.
                button.btn.btn-primary.mt-5( @click='push({ name: "demo" })') Iniciar prueba

</template>
<style lang="sass" scoped>

button
    padding: 1rem

.container-fluid
    padding-top: 7rem
</style>
