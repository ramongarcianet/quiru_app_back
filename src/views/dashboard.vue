<script setup>
import {cerrarSesion, miUsuario} from '../store/sesion'
import {useRouter} from 'vue-router'
const {push} = useRouter()


</script>
<template>
 <nav>
    <h1> Hola, {{ miUsuario()?.email}}</h1>
    <ul>
      <li @click="cerrarSesion()">Cerrar sesión</li>
      <li @click="push({name:'index'})">Inicio</li>
      <li @click="push({name:'admision'})">Admisión</li>
      <li @click="push({name:'usuarios'})">Usuarios</li>
      <li @click="push({name:'odontograma'})">Odontograma</li>
    </ul>
  </nav>
<h1>Bienvenido a Quiru</h1>
<router-view/>

</template>