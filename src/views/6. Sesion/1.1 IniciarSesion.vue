<script setup>
import { useRouter } from "vue-router";
import { item, iniciarSesion } from "../../store/sesion";
const { push } = useRouter();
</script>

<template lang="pug">
.derecha
    .centrar
        h2.text-center.mt-4(style="color:#395D56") Bienvenido
        h1.text-center.light-text Inicia sesión
        Form( :onPromise='()=>iniciarSesion(item)' ) 
            label.form-label Correo electrónico
            input.form-control.mb-2( v-model='item.email' type='email' required)
            label.form-label Contraseña
            input.form-control.mb-3( v-model='item.password' type='password' required)
            .row
                button.btn.btn-outline-light( type='submit') Iniciar sesión
                button.btn.btn-outline-light.text-center.m-1( type='button' @click='push({name: "registro"})' style="border: 0!important;") Registrarme
</template>

<style lang="sass" scoped>
.derecha
    padding:5px 25px
    background: #37DFBB
    border-top-left-radius: 42px
    border-top-right-radius: 42px
    display: flex
    flex-direction: column
    width: 100%

@media (min-width: 575px)
    .derecha
        padding:0px 25px
        border-top-left-radius: 35px
        border-bottom-left-radius: 35px
        border-top-right-radius: 0
        width: 100%
        height: 100vh
    .centrar
        padding: 22% 10%
        form
            padding: 0px 60px
            .row
                padding: 0px 80px

</style>
