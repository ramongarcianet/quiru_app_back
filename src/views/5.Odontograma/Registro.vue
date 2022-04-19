<script setup>
import { onUnmounted, ref } from 'vue'
import {obtenerTodos, registro, leerEnRegistro, eliminar, dialog} from '../../store/usuario'
const obtenerRegistro = obtenerTodos()

const confirmar = ref(false)

const confirmarEliminar = id => eliminar(id).then(()=> confirmar.value = false)

</script>

<template>

      <Row>
        <Col>Nro</Col>
        <Col>Diente</Col>
        <Col>Hallazgo</Col>
        <Col>Pieza</Col>
        <Col></Col>   
        <Col></Col>                       
    </Row> 
    <Item  v-for="item of registro"  :key="item.id"  :item="item">
        <Col>{{item.tipdoc}}</Col> 
        <Col>{{item.numdoc}}</Col> 
        <Col>{{item.nombre}}</Col> 
        <Col>{{item.apellidoPaterno}}</Col> 
        <Col>
            <Button @click="dialog=true, leerEnRegistro(item.id)"> Editar </Button>
        </Col>            
        <Col>    
            <Button @click="confirmar == false ? confirmar = true : confirmarEliminar(item.id) ">  {{confirmar ? '¿Está seguro?' : 'Borrar'}} </Button>
        </Col>  
    </Item>
   
</template>

