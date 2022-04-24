<script setup>

import Formulario from './Formulario.vue'
import RegistroOdontograma from './RegistroOdontograma.vue'
import {dialog,obtenerTodos, guardar} from '../../store/formodontograma'
import FormOdontograma from './FormOdontograma.vue';
import FormPaciente from '../3.Paciente/FormularioR.vue';
</script>
<template>
<h1>Odontograma</h1>
<row>
<Container class="fluid">
    <Container>
      <FormPaciente></FormPaciente>
      <RegistroOdontograma /> 
      <Button @click="guardar()"> Nuevo Odontograma</Button> 
      <Formulario :open='dialog' />
    
    </Container>
  </Container>
</row>
</template>