<script setup>

import Formulario from './Formulario.vue'
import Registro from './Registro.vue'
import {dialog} from '../../store/admision'

</script>
<template>
<h1>Admisión</h1>
<Container class="fluid">
    <Container>
      <Button @click="dialog=true"> Nuevo </Button>
      <Formulario :open='dialog' />
      <Registro />
    </Container>
  </Container>
</template>