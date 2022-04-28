<script setup>
import { useRouter } from "vue-router";

const {push} = useRouter()

</script>
<template lang="pug">

.container-fluid
    .container
        .row
            .col-12.col-md-5.d-flex.flex-column.justify-content-center
                h1.primary-text Atiende a más pacientes y aumenta tus 
                    span.dark-text ganancias
                span Olvídate de escribir notas o quitarte los guantes para hacer tus anotaciones y diagnósticos. Usa quiru tu nuevo asistente de voz y enfócate en brindar el mejor servicio a tus pacientes. 
                input(type="text" placeholder="Ingresa tu correo electrónico")
            .col-12.col-md-7.d-flex.align-items-end
                img.w-100(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FPortada-img.webp?alt=media&token=487cd780-bfe7-490f-a52a-7cb5033f673f")

</template>

<style scoped lang="sass">

.container-fluid
    padding-top: 7rem
    background: linear-gradient(to bottom, rgba(255,255,255,1) 39%, rgba(190,245,234,1) 87%)
.container    
    h1
        font-size: 3em
    input
        max-width: 420px
        width: calc(100% - 2rem)
        height: 50px
        border-radius: 50px
        border: 1px solid var(--color-primary)
        margin-top: 30px
        margin-bottom:  25px 
        &:active 
            background-color: blue
            transition: background-color 1s

</style>
