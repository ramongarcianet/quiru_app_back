<script setup>
import { onUnmounted, ref } from 'vue'
import {obtenerTodos, registro, leerEnRegistro, eliminar, dialog} from '../../store/admision'
const obtenerRegistro = obtenerTodos()

/*onUnmounted( ()=> {
  obtenerRegistro?.then( unsub => unsub())
})*/

const confirmar = ref(false)

const confirmarEliminar = id => eliminar(id).then(()=> confirmar.value = false)

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
    <Item  v-for="item of registro"  :key="item.id"  :item="item">
        <Col>{{item.tipoDocumento}}</Col>
        <Col>{{item.numeroDocumento}}</Col>
        <Col>{{item.nombre}}</Col>
        <Col>{{item.apellidoPaterno}}</Col>
        <Col>{{item.apellidoMaterno}}</Col>
        <Col>{{item.fechaAdmisión}}</Col>
        <Col>{{item.Comentario}}</Col>
        <Col>
            <Button @click="dialog=true, leerEnRegistro(item.id)"> Editar </Button>
        </Col>
        <Col>
            <Button @click="confirmar == false ? confirmar = true : confirmarEliminar(item.id) ">  {{confirmar ? '¿Está seguro?' : 'Borrar'}} </Button>
        </Col>
    </Item>

</template>

