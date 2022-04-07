<script setup>
import { onUnmounted, ref } from 'vue'
import {obtenerTodos, registro, leerEnRegistro, eliminar, dialog} from '../../store/usuario'
const obtenerRegistro = obtenerTodos()

const confirmar = ref(false)

const confirmarEliminar = id => eliminar(id).then(()=> confirmar.value = false)

</script>

<template>

<ul>
    <Item  v-for="item of registro"  :key="item.id"  :item="item">
        <p>{{item.tipdoc}}</p> 
        <p>{{item.numdoc}}</p> 
        <p>{{item.nombre}}</p> 
        <p>{{item.fechanac}}</p>
        <p>{{item.sexo}}</p>
        <Button @click="dialog=true, leerEnRegistro(item.id)"> Editar </Button>
        <Button @click="confirmar == false ? confirmar = true : confirmarEliminar(item.id) ">  {{confirmar ? '¿Está seguro?' : 'Borrar'}} </Button>
     
    </Item>
</ul>
   
</template>

