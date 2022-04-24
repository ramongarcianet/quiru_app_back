<script setup>
import Formulario from './Formulario.vue'
import RegistroOdontograma from './RegistroOdontograma.vue'
import {dialog,obtenerTodos, guardar} from '../../store/formodontograma'
import {leer as leerPaciente} from '../../store/paciente'
import FormOdontograma from './FormOdontograma.vue';
import FormPaciente from '../3.Paciente/FormularioR.vue';
import { useRoute } from 'vue-router';
import { onUnmounted } from '@vue/runtime-core';

const route = useRoute()
let obtener

if( route.params.idPaciente) {
  leerPaciente( route.params.idPaciente)
  obtener = obtenerTodos( route.params.idPaciente )
}

onUnmounted(()=>{
  if (obtener) obtener()
})
</script>
<template>

<h1>Odontograma</h1>
<row>
<Container class="fluid">
    <Container>
      <Formulario :open='dialog' />
    
    </Container>
  </Container>
</row>
</template>