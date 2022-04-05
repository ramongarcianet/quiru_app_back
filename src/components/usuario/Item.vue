<script setup>
import { onUnmounted, ref } from 'vue'
import {leerEnRegistro, eliminar} from '../../store/usuario'
import {dialog} from '../../store/usuario.js'

const confirmar = ref(false)

const confirmarEliminar = id => eliminar(id).then(()=> confirmar.value = false)

defineProps(['item'])

</script>

<template>

    <li> 
        <p>{{item.tipdoc}}</p> 
        <p>{{item.numdoc}}</p> 
        <p>{{item.nombre}}</p> 
        <p>{{item.fechanac}}</p>
        <p>{{item.sexo}}</p>
        <Button @click="dialog=true, leerEnRegistro(item.id)"> Editar </Button>
        <Button @click="confirmar == false ? confirmar = true : confirmarEliminar(item.id) ">  {{confirmar ? '¿Está seguro?' : 'Borrar'}} </Button>
    </li>
   
</template>

<style scoped>
li {
    display: flex;
    align-items: center;
    border: 1px solid black;
    border-radius: 1rem;
    padding: 0 1rem;
    margin: .5rem
}
li p{
    width: 100%
}

</style>

