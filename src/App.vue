<script setup>
import { onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router';
/*
import Formulario from './components/Formulario.vue'
import Registro from './components/Registro.vue'
import {dialog} from './store/admision'
*/


const {push} = useRouter()
</script>

<template>
  <nav>
    <ul>
      <li @click="push({name:'index'})">Inicio</li>
      <li @click="push({name:'admision'})">Admisión</li>
      <li @click="push({name:'usuarios'})">Usuarios</li>
      <li @click="push({name:'paciente'})">Paciente</li>
      <li @click="push({name:'diccionario'})">Diccionario</li>
      <li>Cerrar sesión</li>
    </ul>
  </nav>


  <router-view></router-view>


</template>

