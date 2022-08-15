<script setup>
import { useRouter } from "vue-router";
import { item, iniciarSesion } from "../../store/sesion";

const { push } = useRouter();
</script>

<template lang="pug">
div
    <h1>Iniciar sesion</h1>

    Form( :onPromise='()=>iniciarSesion(item)' ) 
        label.form-label Correo electrónico
        input.form-control( v-model='item.email' type='email' required)
        label.form-label Contraseña
        input.form-control( v-model='item.password' type='password' required)
        button.btn.btn-outline-light.ms-auto( type='submit') Iniciar sesión
        p No tengo una cuenta  
            strong.pointer.light-text( type='button' @click='push({name: "registro"})') Registrarse
    
</template>
<style lang="sass" scoped>
div
    display: flex
    flex-direction: column
    width: 90%
    max-width: 400px
</style>
