<script setup>

import Formulario from './Formulario.vue'
import Registro from './Registro.vue'
import {dialog} from '../../store/diccionario'

</script>
<template>
<h1>Diccionario</h1>
<row>
<Container class="fluid">
    <Container>
      <Button @click="dialog=true"> Nuevo </Button>
      <Formulario :open='dialog' />
      <Registro />
    </Container>
  </Container>
</row>
</template>