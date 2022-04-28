<script setup>
import { useRouter } from "vue-router";
import Logo from "../../../assets/logoQuiru.vue"

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
nav.w-100
    .container.d-flex.w-100
        img(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/Group%2073%20(1).png?alt=media&token=13f628f8-46ea-41f4-a4f4-b4d2aa604323")
        .d-none.d-md-flex.align-items-center
            h4 Beneficios
            h4 Precio
            h4 Producto
            h4 Contacto
        button.ms-auto( @click='$emit("update:modelValue", true)' ) Probar
//-Primer segmento     

</template>

<style scoped lang="sass">

nav
    position: fixed
    top: 0
    left: 0
    background-color: #ffffff
    height: 100px
    display: flex
    align-items: center
    img
        width: 120px!important
        height: auto
    h4
        cursor: pointer
        color: var(--color-primary)
        margin: 0 2rem
        font-weight: 400
        &:hover
            color: var(--color-primary-tint)
    buttom
        width: 180px
        height: 40px
        border-radius: 50px
        background-color: #37DFBB
        border: 0px
        display: flex
        align-items: center
        text-align: center
        justify-content: center
        color: #ffffff
        font-size: 14px
        font-weight: 600


</style>
