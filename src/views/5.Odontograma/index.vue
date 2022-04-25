<script setup>
import Formulario from './Formulario.vue'
import RegistroOdontograma from './RegistroOdontograma.vue'
import {dialog,obtenerTodos, guardar} from '../../store/formodontograma'
import {leer as leerPaciente} from '../../store/paciente'
import FormOdontograma from './FormOdontograma.vue';
import FormPaciente from '../3.Paciente/FormularioR.vue';
import { useRoute,useRouter } from 'vue-router';
import { onUnmounted } from '@vue/runtime-core';
const {push} = useRouter()
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
      <FormPaciente></FormPaciente>
      <RegistroOdontograma /> 
      <Button @click="guardar(route.params.idPaciente,'Diagnóstico')"> Nuevo Diagnóstico</Button> 
      <Button @click="guardar(route.params.idPaciente,'Tratamiento')"> Nuevo Tratamiento</Button>  
      <Button @click="push({name: 'paciente', params: {} })"> Volver </Button>
    </Container>
  </Container>
</row>
</template>