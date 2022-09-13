<script setup>
import { useRouter } from "vue-router";
import {ref} from 'vue'
import { item, resetContraseña } from "../../store/sesion";
const { push } = useRouter();
const mensaje = ref('')
</script>

<template lang="pug">
.derecha
    .centrar
        h2.text-center.mt-4(style="color:#395D56") Bienvenido
        h1.text-center.light-text Recupera tu contraseña
        Form( :onPromise='()=>resetContraseña(item)'  :onSuccess='()=>mensaje = "Correo enviado"' :onCatch='()=>mensaje = "Este correo no ha sido registrado"') 
            label.form-label Correo electrónico
            input.form-control.mb-2(placeholder="Ejemplo@gmail.com" v-model='item.email' type='email' required)
            .row
                button.btn.btn-outline-light.my-2(type='submit') Enviar
                button.btn.btn-outline-light.mb-2(@click='push({ name: "iniciar-sesion" })') Volver al inicio
                p.alert.alert-danger.alert-dismissible(v-if='mensaje') {{mensaje}}

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