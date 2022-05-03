<script setup>

import Registro from './Registro.vue'
import { useRouter } from 'vue-router'
const {push} = useRouter()
</script>
<template>
<h1>Usuario</h1>
<div class="container">
  <Button @click="push({name: 'usuario'}) "> Nuevo </Button>
  <Registro />
</div>
</template>