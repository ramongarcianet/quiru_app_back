<script setup>
import { useRouter } from "vue-router";
import { item, crearCuenta } from "../../store/sesion";
const { push } = useRouter();
</script>

<template lang="pug">

<h1>Registro</h1>
Form( :onPromise='()=>crearCuenta(item)' ) 
    label.form-label Nombre
    input.form-control( v-model='item.nombre' placeholder='Nombre' required)
    label.form-label Apellidos
    .input-group
        input.form-control( v-model='item.apellidoPaterno' placeholder="Apellido Paterno" required)
        input.form-control( v-model='item.apellidoMaterno' placeholder="Apellido Materno" required)
    label.form-label Correo electrónico
    input.form-control( v-model='item.email' type='email' placeholder='Correo' required)
    label.form-label Contraseña
    input.form-control( v-model='item.password' type='password' placeholder='Contraseña' required)
    button.btn.btn-outline-light( type='submit') Registro
    p.mt-3 Tengo una cuenta  
        strong.pointer.light-text( type='button' @click='push({name: "iniciar-sesion"})') Iniciar sesión
</template>
<style lang="sass" scoped>

form
    display: flex
    flex-direction: column
</style>
