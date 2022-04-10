<script setup>
import {cerrarSesion} from '../store/sesion'
import {useRouter} from 'vue-router'
const {push} = useRouter()
</script>
<template>
 <nav>
    <ul>
      <li @click="cerrarSesion()">Cerrar sesión</li>
      <li @click="push({name:'index'})">Inicio</li>
      <li @click="push({name:'admision'})">Admisión</li>
      <li @click="push({name:'usuarios'})">Usuarios</li>
      <li @click="push({name:'odontograma'})">Odontograma</li>
      <li>Cerrar sesión</li>
    </ul>
  </nav>
<h1>Bienvenido a Quiru</h1>
<router-view/>

</template>