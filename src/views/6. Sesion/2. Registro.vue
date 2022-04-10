<script setup>
import {item, crearCuenta} from '../../store/sesion'


</script>

<template>
    <h1>Registro</h1>

    <form @submit.prevent='crearCuenta(item)'>
        <input v-model='item.nombre' >

        <input v-model='item.apellido'>

        <input v-model='item.email' type='email'>
        <input v-model='item.password' type='password'>
        <button>CRear cuenta</button>
    </form>
</template>