<script setup>
import { useRouter } from "vue-router";
import { item, crearCuenta } from "../../store/sesion";
const { push } = useRouter();
</script>

<template lang="pug">
.derecha
    .centrar
        h2.text-center.mt-4(style="color:#395D56") Bienvenido
        h1.text-center.light-text Registro
        Form( :onPromise='()=>crearCuenta(item)' ) 
            label.form-label Nombre
            input.form-control( v-model='item.nombre' required)
            label.form-label Apellidos
            .input-group
                input.form-control( v-model='item.apellidoPaterno' required)
                input.form-control( v-model='item.apellidoMaterno' required)
            label.form-label Correo electrónico
            input.form-control( v-model='item.email' type='email' required)
            label.form-label Contraseña
            input.form-control.mb-4( v-model='item.password' type='password' required)
            button.btn.btn-outline-light.m-1( type='submit') Registrarme
            button.btn.btn-outline-light.m-2( type='button' @click='push({name: "iniciar-sesion"})' style="border: 0!important;") Iniciar sesión
</template>
<style lang="sass" scoped>

.derecha
        background: #37DFBB
        border-top-left-radius: 42px
        border-top-right-radius: 42px
form
    padding:5px 25px
    display: flex
    flex-direction: column
    background: #37DFBB

@media (min-width: 575px)
    .derecha
        background: #37DFBB
        border-top-left-radius: 35px
        border-bottom-left-radius: 35px
        border-top-right-radius: 0
        height: 100vh
        width: 100%
    .centrar
        padding: 10% 10%
        form
            padding: 0px 60px
            .row
                padding: 0px 40px
</style>
