<script setup>

import Formulario from './Formulario.vue'
import Registro from './Registro.vue'
import {dialog} from '../../store/paciente'

</script>
<template>
<h1>Paciente</h1>
<div class="container">
  <Button @click="dialog=true"> Nuevo </Button>
  <Formulario :open='dialog' />
  <Registro />
</div>
</template>