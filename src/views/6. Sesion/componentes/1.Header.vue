<script setup>
import { useRouter } from "vue-router";
import marketing from "../../../store/marketing";
//const {registrarEvento} = marketing
const { push } = useRouter();
</script>
<template lang="pug">

.container-fluid
    .container
        .row
            .col-12.col-md-5.d-flex.flex-column.justify-content-center
                h1.primary-text Enfócate en tu atención 
                    span.dark-text QUIRU Dent AI toma nota
                span Olvídate de quitarte los guantes para hacer tus diagnósticos. QUIRU Dent AI es tu asistente de voz para que te enfoques en brindar el mejor servicio a tus pacientes.
                button.btn.btn-primary.me-auto.mt-3( @click='push({ name: "demo" })' ) Sé el primero
            .col-12.col-md-7.d-flex.align-items-end
                Img.w-100(src="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/landing%2FPortada-_1_-_1_.webp?alt=media&token=255bdaec-632b-4a46-a72c-8d4a4f4c1ca5")

</template>

<style scoped lang="sass">

button
    padding: 1rem

.container-fluid
    padding-top: 7rem
    background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(190,245,234,1) 100%)
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
