<script setup>
import {item, iniciarSesion} from '../../store/sesion'


</script>

<template lang="pug">
div
    <h1>Iniciar sesion</h1>

    Form( :onPromise='()=>iniciarSesion(item)' ) 
        label Correo electrónico
        input( v-model='item.email' type='email' )
        label Contraseña
        input( v-model='item.password' type='password' )
        button.light-outlined( type='submit') Iniciar sesión
    
</template>
<style lang="sass" scoped>
div
    display: flex
    flex-direction: column
    width: 90%
    max-width: 400px
    form
        display: flex
        flex-direction: column

</style>