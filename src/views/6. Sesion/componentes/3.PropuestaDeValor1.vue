<script setup>
import { useRouter } from 'vue-router';
import marketing from '../../../store/marketing';
const {registrarEvento} = marketing
const {push} = useRouter()
</script>
<template lang="pug">

#producto.container-fluid.my-5
    .container
        .row
            .col-12.col-md-5.d-flex.flex-column.justify-content-center.align-items-start.beneficios
                ul.m-0.p-0
                    li.d-flex.align-items-center.mb-4
                        h1.primary-text Tu nuevo asistente de 
                            span.dark-text voz 
                        Img.ms-3( width='60' src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FAsistente-de-voz.webp?alt=media&token=e8ca81fb-bed4-489d-a115-34cc92090bfc")
                span ¿Recuerdas cuando te sacabas 3 veces los guantes para tomar notas y esperar a que acabe la atención para llenar tus formatos? Con Quiru se acabó, el asistente de voz te acompaña durante tu atención registrando el odontograma una sola vez.
                button.btn.btn-primary.mt-5( @click='push({ name: "demo" }), registrarEvento("act_btn_pv1")') Iniciar prueba
            .col-12.col-md-7.h-100.d-flex.align-items-end
                Img.w-100(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FGroup-74-_3_.webp?alt=media&token=36a5ae62-c1d3-4989-8a0a-207cd288c06d")

</template>
<style lang="sass" scoped>
.container-fluid
    padding-top: 7rem
</style>
