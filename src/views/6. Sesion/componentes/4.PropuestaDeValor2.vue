<script setup>
import { useRouter } from 'vue-router';
import marketing from '../../../store/marketing';
const {registrarEvento} = marketing
const {push} = useRouter()
</script>
<template lang="pug">
                  
.container-fluid.my-5
    .container
        .row
            .col-12.col-md-5.d-flex.flex-column.justify-content-center.align-items-start.beneficios
                ul.m-0.p-0
                    li.beneficios.d-flex.align-items-center.mb-4
                        h1.primary-text Registra un odontograma 
                            span.dark-text correcto 
                        Img.ms-3( width='60' src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fevitar-perdida-de-informacion.webp?alt=media&token=b3c6d1ca-7b90-4d94-9f9d-7f55d4125e6b")
                span Olvídate de los colores y el corrector, Quiru de una sola vez registrará el odontograma de acuerdo a los estándares según la norma actual.
                button.btn.btn-primary.mt-5( @click='push({ name: "demo" }), registrarEvento("act_btn_pv2")') Iniciar prueba
            .col-12.col-md-7.h-100.d-flex.align-items-end
                Img.w-100(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FAPP-2.webp?alt=media&token=1ecd739b-f318-4765-8837-52365fb33d8e")                                              

</template>
<style lang="sass" scoped>
.container-fluid
    padding-top: 7rem
</style>
