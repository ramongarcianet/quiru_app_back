<script setup>
import {ref} from 'vue'
import {item, guardar, actualizar}  from '../../store/usuario'

const guardarOActualizar = () => {
    if (item.value.id) actualizar(item.value).then(()=>item.value = {})
    else guardar( item.value).then(()=>item.value = {})
}

import {dialog} from '../../store/usuario'

</script>

<template>

<dialog :open="$attrs.dialog">
    <form @submit.prevent="e => guardarOActualizar()">
    <Col>
        <Row> 
            <Col>
                <input placeholder="Código" v-model="item.codigo" required>
            </Col>
            <Col>
                <select placeholder="Tipo Documento" v-model="item.tipdoc"  required>
                    <option value="DNI"> DNI</option>
                    <option value="CE"> CE</option>
                </select>
            </Col>
            <Col>
                <input placeholder="Número Documento" v-model="item.numdoc" required>
            </Col>
        </Row>
        <Row>
            <Col>
                <input placeholder="Nombre" v-model="item.nombre" required>
            </Col>
            <Col>
                <input placeholder="Apellido Paterno" v-model="item.apellidoPaterno"  required>
            </Col>
             <Col>
                <input placeholder="Apellido Materno" v-model="item.apellidoMaterno"  required>
            </Col>
        </Row>
        <Row>
            <Col>
                <input type="date" v-model="item.fechaDeNacimiento"  required>
            </Col>
            <Col>
                <select placeholder="Sexo" v-model="item.sexo"  required>
                    <option value="M"> Masculino</option>
                    <option value="F"> Femenino</option>
                </select> 
            </Col>
             <Col>
                <input placeholder="Correo Electrónico" v-model="item.email" type='email'  required>
            </Col>
        </Row>
        <Row>
            <input placeholder="Dirección" v-model="item.direccion"  required>        
        </Row>
        <Row>
            <Col>
                <input placeholder="Usuario" v-model="item.usuario" required>
            </Col>
            <Col>
                <input type="password" pattern=".{6,}" placeholder="Password" v-model="item.password" required> 
            </Col>
             <Col>
                <input type="password" pattern=".{6,}" placeholder="Confirmar Password" v-model="item.confirmpassword" required> 
            </Col>
        </Row>
        <Row>
            <Button type="button" @click="dialog = false"> Cancelar </Button>
            <Button> Guardar</Button>
        </Row>
    </Col>
    </form>
</dialog>

</template>

