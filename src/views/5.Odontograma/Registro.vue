<script setup>
import { onUnmounted, ref } from 'vue'
import {obtenerTodos, registro, leerEnRegistro, eliminar, dialog} from '../../store/odonto'
const obtenerRegistro = obtenerTodos()

const confirmar = ref(false)

const confirmarEliminar = id => eliminar(id).then(()=> confirmar.value = false)

</script>

<template>

      <Row>
        <Col>Diente</Col>
        <Col>Hallazgo</Col>
        <Col>Piezas</Col>
        <Col></Col>                        
    </Row> 
    <Item  v-for="item of registro"  :key="item.id"  :item="item">
        <Col>{{item.diente}}</Col> 
        <Col>{{item.hallazgo}}</Col> 
        <Col>{{item.pieza}}</Col>             
        <Col>    
            <Button @click="confirmar == false ? confirmar = true : confirmarEliminar(item.id) ">  {{confirmar ? '¿Está seguro?' : 'Borrar'}} </Button>
        </Col>  
    </Item>
   
</template>

