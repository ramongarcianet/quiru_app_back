<script setup>
import { useRouter } from "vue-router";
import { item, iniciarSesion, logGoogle, logFacebook } from "../../store/sesion";
import { ref } from 'vue'
const { push } = useRouter();
const mensaje = ref('')
const adios = ()=> {
  location.replace('https://quiru.app/')
  }
</script>

<template lang="pug">
.derecha
    .ladito
    //button.btn.border-0(@click="adios()" style="color: white")
            i.fa-solid.fa-arrow-left-long.fa-xl
    .centrar
        h1.text-center.light-text Bienvenido a QUIRU
        h5.text-center.mt-3(style="color:#395D56") si ya tienes una cuenta puedes iniciar sesión, si eres un nuevo usuario haz click en registrarme
        h1.text-center(style="color:#395D56") Inicia sesión
        Form( :onPromise='()=>iniciarSesion(item)' :onCatch='error => mensaje = error') 
            label.form-label Correo electrónico
            input.form-control.mb-2(placeholder="Ejemplo@gmail.com" v-model='item.email' type='email' required)
            label.form-label Contraseña
            input.form-control.mb-3(placeholder="********" v-model='item.password' type='password' required)
            .row
                button.btn.btn-outline-light(type='submit' ) Iniciar sesión 
                button.btn.btn-outline-light.text-center.m-1( type='button' @click='push({name: "registro"})' style="border: 0!important;") Registrarme
                button.btn.btn-outline-light.text-center.m-1( type='button' @click='push({name: "reset-contrasena"})' style="border: 0!important;") Olvidé mi contraseña
                p.alert.alert-danger.alert-dismissible(v-if='mensaje') {{mensaje}}
                button.btn.btn-outline-light.text-center.m-1( type='button' @click='push({name: "politica-privacidad"})' style="border: 0!important;") Política de privacidad

        .loginRedes.text-center
            //button(style="background-color: #3b5998" @click="logFacebook()")
                i.fa.fa-facebook
                span Iniciar con Facebook
            button(style="background-color: #B03A2E" @click="logGoogle()")
                i.fa.fa-google-plus
                span Iniciar con Google

</template>

<style lang="sass" scoped>
.loginRedes
    button
        border-radius: 10px
        padding: 0.7rem
        margin: 15px
        color: white
        border: none
        i
            margin: 10px
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
        padding: 10% 10%
        form
            padding: 0px 60px
            .row
                padding: 0px 80px

</style>
