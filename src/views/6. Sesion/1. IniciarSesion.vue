<script setup>
import {item, iniciarSesion} from '../../store/sesion'


</script>

<template>
    <h1>Iniciar sesion</h1>

    <form @submit.prevent='iniciarSesion(item)'>
        <input v-model='item.email' type='email'>
        <input v-model='item.password' type='password'>
        <button>Iniciar sesión</button>
    </form>
</template>