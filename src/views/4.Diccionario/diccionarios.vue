<script setup>

import { useRouter } from 'vue-router'
import Registro from './Registro.vue'
const {push} = useRouter()
</script>
<template>
<h1>Diccionario</h1>
<row>
<Container class="fluid">
    <Container>
      <Button @click="push({name: 'diccionario'})"> Nuevo </Button>
      <Registro />
    </Container>
  </Container>
</row>
</template>