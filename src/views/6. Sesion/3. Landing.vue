<script setup>
import { useRouter } from "vue-router";

const {push: ruta} = useRouter()
</script>
<template>
<h1>Bienvenido a quiru</h1>

<button @click='push({name:"iniciar-sesion"})'> Iniciar sesion</button>
<button @click='push({name:"registro"})'> Crear cuenta</button>
</template>