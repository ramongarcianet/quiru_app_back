<template lang="pug">
                  
#precio.container-fluid.my-5
    .container
        .row
            .col-12.col-md-6.d-flex.flex-column.justify-content-start
                h1.primary-text Forma parte de los primeros usuarios y obtén 
                    span.dark-text ¡Beneficios!
            .col-12.col-md-6.d-flex.flex-column.justify-content-center.align-items-start
                span Tenemos descuentos para los que se hayan inscrito hasta del 30% en los primeros meses de usar Quiru. Válido hasta 00/00/00. Déjanos tus datos para darte el acceso y puedas probar esta nueva forma de atender a tus pacientes
                button.btn.btn-primary.mt-5( @click='$emit("update:modelValue", true)') Iniciar prueba
        .row.d-flex.justify-content-center.align-items-center
            .col-12.col-md-6.align-items-center.mt-5
                img.w-100( width='500' src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fdescuentos.webp?alt=media&token=681a5c26-f1d3-4c94-a99e-09452c2dddd5 ")

</template>

<style scoped lang="sass">
h1
    font-size: 3em
</style>
<style lang="sass" scoped>
.container-fluid
    padding-top: 7rem
</style>
