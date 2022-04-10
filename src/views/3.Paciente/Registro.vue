<script setup>
import { onUnmounted, ref } from 'vue'
import {obtenerTodos, registro, leerEnRegistro, eliminar, dialog} from '../../store/paciente'

const obtenerRegistro = obtenerTodos()


const confirmar = ref(false)

const confirmarEliminar = id => eliminar(id).then(()=> confirmar.value = false)

</script>

<template>

      <Row>
        <Col>Tip Doc.</Col>
        <Col>Número Doc.</Col>
        <Col>Nombres</Col>
        <Col>Fecha Nac.</Col>
        <Col>Sexo</Col>
        <Col></Col>
        <Col></Col>
    </Row>
    <Item  v-for="item of registro"  :key="item.id"  :item="item">
        <Col>{{(item.tipoDocumento=='01')? 'DNI': 'CARNET DE EXTRANJERIA'}}</Col>
        <Col>{{item.numeroDocumento}}</Col>
        <Col>{{item.nombre+ ' '+item.apellidoPaterno +' '+item.apellidoMaterno }}</Col>
        <Col>{{item.fechaNacimiento}}</Col>
        <Col>{{(item.sexo=='01')?'FEMENINO':'MASCULINO'}}</Col>
        <Col>
            <Button @click="dialog=true, leerEnRegistro(item.id)"> Editar </Button>
        </Col>
        <Col>
            <Button @click="confirmar == false ? confirmar = true : confirmarEliminar(item.id) ">  {{confirmar ? '¿Está seguro?' : 'Borrar'}} </Button>
        </Col>
    </Item>

</template>

