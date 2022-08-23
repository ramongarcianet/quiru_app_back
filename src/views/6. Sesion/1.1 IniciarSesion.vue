<script setup>
import { useRouter } from "vue-router";
import { item, iniciarSesion } from "../../store/sesion";

const { push } = useRouter();
</script>

<template lang="pug">
div
    Img.w-100( width='500' src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fdescuentos.webp?alt=media&token=681a5c26-f1d3-4c94-a99e-09452c2dddd5 ")
    h3.text-center Bienvenido
    h1.text-center.light-text Inicia sesión
    Form( :onPromise='()=>iniciarSesion(item)' ) 
        label.form-label Correo electrónico
        input.form-control( v-model='item.email' type='email' required)
        label.form-label Contraseña
        input.form-control( v-model='item.password' type='password' required)
        button.btn.btn-outline-light.ms-auto( type='submit') Iniciar sesión
        button.btn.btn-outline-light.ms-auto( type='button' @click='push({name: "registro"})') Registrarme

</template>
<style lang="sass" scoped>
div
    display: flex
    flex-direction: column
    width: 90%
    max-width: 400px
</style>
