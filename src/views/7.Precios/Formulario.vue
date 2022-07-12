<script setup>
import {ref} from 'vue'
import {item, guardar, actualizar,limpiar, dialog}  from '../../store/admision'

const guardarOActualizar = () => {
    if (item.value.id) actualizar(item.value).then(()=>limpiar())
    else guardar( item.value).then(()=>limpiar())
}


</script>

<template>

<dialog :open="$attrs.dialog">
    <form @submit.prevent="e => guardarOActualizar()">
        <Col>
        <Row>
            <Col>
                <select v-model="item.tipoDocumento"  required>
                    <option value="DNI"> DNI</option>
                    <option value="CE"> CARNET DE EXTRAJERIA</option>
                </select>
            </Col>
            <Col>
                <input placeholder="Número Documento" v-model="item.numeroDocumento" required>
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
                <input placeholder="Fecha Admisión" type="date" v-model="item.fechaAdmisión"  required>
            </Col>
        </Row>
        <Row>
            <Col>
                <input placeholder="Comentario" v-model="item.Comentario"  required>
            </Col>
        </Row>
        <Row>
          <Col>
            <Button type="button" @click="dialog = false;limpiar()"> Cancelar </Button>
          </Col>
          <Col>
            <Button> Guardar</Button>
          </Col>
        </Row>
    </Col>
    </form>
</dialog>

</template>

