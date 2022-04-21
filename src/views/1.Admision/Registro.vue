<script setup>
import { onUnmounted, ref } from 'vue'
import {obtenerTodos, registro, leerEnRegistro, eliminar, dialog,verOdontograma} from '../../store/admision'

const obtenerRegistro = obtenerTodos()


const confirmar = ref(false)

const confirmarEliminar = id => eliminar(id).then(()=> confirmar.value = false)

</script>

<template>
<Row>
    <Col>Tip Doc.</Col>
    <Col>Número Doc.</Col>
    <Col>Nombres</Col>
    <Col>Fecha Admisión</Col>
    <Col></Col>
    <Col></Col>
    <Col></Col>
</Row>

<Item v-for="item of registro" :key="item.id" :item="item">
    <Col>{{item.tipoDocumento}}</Col>
    <Col>{{item.numeroDocumento}}</Col>
    <Col>{{item.nombre+ ' '+item.apellidoPaterno +' '+item.apellidoMaterno }}</Col>
    <Col>{{item.fechaAdmisión}}</Col>
    <Col>
       <Button @click="dialog=true, verOdontograma(item.id)"> Odontograma </Button>
    </Col>
    <Col>
       <Button @click="dialog=true, leerEnRegistro(item.id)"> Editar </Button>
    </Col>
    <Col>
        <Button @click="confirmar == false ? confirmar = true : confirmarEliminar(item.id) ">  {{confirmar ? '¿Está seguro?' : 'Borrar'}} </Button>
    </Col>
</Item>

</template>

