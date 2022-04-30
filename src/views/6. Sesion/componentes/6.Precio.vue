<script setup>
import marketing from '../../../store/marketing';
const {registrarEvento} = marketing
</script>
<template lang="pug">
                  
#precio.container-fluid.my-5
    .container
        .row
            .col-12.col-md-6.d-flex.flex-column.justify-content-start
                h1.primary-text Forma parte de los primeros odontólogos modernos y obtén 
                    span.dark-text ¡Beneficios!
            .col-12.col-md-6.d-flex.flex-column.justify-content-center.align-items-start
                span Ten acceso anticipado y gana un descuento del 50% en los primeros 6 meses. Déjanos tus datos para darte el acceso anticipado y puedas probar esta nueva forma de atender a tus pacientes * Inscríbete sin consto.Válido hasta 20/05/2022. 
                button.btn.btn-primary.mt-5( @click='$emit("update:modelValue", true), registrarEvento("act_btn_price")') Iniciar prueba
        .row.d-flex.justify-content-center.align-items-center
            .col-12.col-md-6.align-items-center.mt-5
                Img.w-100( width='500' src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fdescuentos.webp?alt=media&token=681a5c26-f1d3-4c94-a99e-09452c2dddd5 ")

</template>

<style scoped lang="sass">
h1
    font-size: 3em
</style>
<style lang="sass" scoped>
.container-fluid
    padding-top: 7rem
</style>
