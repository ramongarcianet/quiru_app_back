<script setup>
import {item, crearCuenta} from '../../store/sesion'


</script>

<template lang="pug">
div
    <h1>Registro</h1>

    Form( :onPromise='()=>crearCuenta(item)' ) 
        label Nombre
        input( v-model='item.nombre' )
        label Apellido paterno
        input( v-model='item.apellidoPaterno' )
        label Apellido materno
        input( v-model='item.apellidoMaterno' )
        label Correo electrónico
        input( v-model='item.email' type='email' )
        label Contraseña
        input( v-model='item.password' type='password' )
        button.light-outlined( type='submit') Registro
    
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