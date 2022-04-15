<script setup>

import Formulario from './Formulario.vue'
import Registro from './Registro.vue'
import {dialog} from '../../store/usuario'

</script>
<template>
<h1>Usuario</h1>
<div class="container">
  <Button @click="dialog=true"> Nuevo </Button>
  <Formulario :open='dialog' />
  <Registro />
</div>
</template>