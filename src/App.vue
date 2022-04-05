<script setup>
import { onUnmounted, ref } from 'vue'
/*
import Formulario from './components/Formulario.vue'
import Registro from './components/Registro.vue'
import {dialog} from './store/admision'
*/
import Formulario from './components/usuario/Formulario.vue'
import Registro from './components/usuario/Registro.vue'
import {dialog} from './store/usuario'
</script>

<template>
  <nav>
    <ul>
      <li>Admisión</li>
      <li>Cerrar sesión</li>
    </ul>
  </nav>

  <Container class="fluid">
    <Container>
      <Button @click="dialog=true"> Nuevo </Button>
      <Formulario :open='dialog' @cerrarDialog="val => dialog = val"/>
      <Registro @abrirDialog="e => dialog = true"/>
    </Container>
  </Container>
</template>

