<script setup>
import {ref} from 'vue'
import {item, guardar, actualizar}  from '../store/admision'

const guardarOActualizar = () => {
    if (item.value.id) actualizar(item.value).then(()=>item.value = {})
    else guardar( item.value).then(()=>item.value = {})
}

import {dialog} from '../store/admision'

</script>

<template>

<dialog :open="$attrs.dialog">
    <form @submit.prevent="e => guardarOActualizar()">
    <Col>
        <input placeholder="Nombre" v-model="item.nombre" required>
        <Row>
        <Col>
            <input placeholder="Apellido paterno" v-model="item.apellidoPaterno">
        </Col>
        <input placeholder="Apellido materno" v-model="item.apellidoMaterno">
        </Row>
        <input placeholder="Código" v-model="item.codigo">
        <input placeholder="Número de documento" v-model="item.numeroDeDocumento">
        <Row>
        <select placeholder="Ubigeo" v-model="item.ubigeo">
            <option value="130101"> La Libertad</option>
            <option value="010101"> Lima</option>
        </select>  
        <input type="date" v-model="item.fechaDeAdmisión">
        </Row>
        <Row>
            <Button type="button" @click="dialog = false"> Cancelar </Button>
            <Button> Guardar</Button>
        </Row>
    </Col>
    </form>
</dialog>

</template>

