<script setup>
import { useRouter } from "vue-router";
import marketing from '../../../store/marketing';

const { push } = useRouter();
const {registrarEvento} = marketing
</script>
<template lang="pug">
                
#contacto.container-fluid.my-5
    .container.mb-5
        .row
            .col-12.col-md-8.d-flex.flex-column.justify-content-center.align-items-start.beneficios
                ul.m-0.p-0
                    li.beneficios.d-flex.align-items-center.mb-4
                        h1.primary-text ¿Te gustaria usar Quiru pero aún tienes 
                            span.dark-text dudas?  
                        Img.ms-3( width='60' src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fevitar-perdida-de-informacion.webp?alt=media&token=b3c6d1ca-7b90-4d94-9f9d-7f55d4125e6b")
                span Agenda una breve reunión con nosotros para resolver todas tus dudas,  con confianza. Atendemos todas las consultas que tengas.
                a( href='https://calendly.com/informacionquiru/info' target='_blank' @click='registrarEvento("act_btn_question")')
                  button.btn.btn-primary.mt-5 Conversemos
            .col-12.col-md-4.h-100.d-flex.align-items-end.mt-5
                .row.justify-content-center.align-items-center
                    .col-6
                        Img.w-100(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FComponent_2_1_.webp?alt=media&token=8740ea24-eef3-468f-969b-50cc4a6ff35c")                                            
    slot
</template>

<style scoped lang="sass">

.container-fluid
    padding-top: 7rem
    background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(190,245,234,1) 100%)
</style>
