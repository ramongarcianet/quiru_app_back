<script setup>
import { onUnmounted, ref } from 'vue'
import {obtenerTodos, registro, leerEnRegistro, eliminar, dialog} from '../../store/admision'
const obtenerRegistro = obtenerTodos()

/*onUnmounted( ()=> {
  obtenerRegistro?.then( unsub => unsub())
})*/


const editar = id => {
    dialog.value=true; 
    leerEnRegistro(id)
}
</script>

<template>
<Row>
    <Col>Tip Doc.</Col>
    <Col>Número Doc.</Col>
    <Col>Nombres</Col>
    <Col>Ape. Paterno</Col>
    <Col>Ape. Materno</Col>
    <Col>Fecha Admisión</Col>
    <Col>Comentario</Col>
    <Col></Col>
    <Col></Col>
</Row>
<div>

<Item  
v-for="item of registro" 
:key="item.id"  
:item="item"
:onDelete='()=> eliminar(item.id)'
:onEdit="()=> editar(item.id)"
>
    <Col>{{item.tipoDocumento}}</Col>
    <Col>{{item.numeroDocumento}}</Col>
    <Col>{{item.nombre}}</Col>
    <Col>{{item.apellidoPaterno}}</Col>
    <Col>{{item.apellidoMaterno}}</Col>
    <Col>{{item.fechaAdmisión}}</Col>
    <Col>{{item.Comentario}}</Col>
  
</Item>
</div>

</template>

