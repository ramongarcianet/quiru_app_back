<script setup>
import { onUnmounted, ref } from 'vue'
import {registroodonto, leerEnRegistro, eliminar, dialog} from '../../store/formodontograma'

const confirmar = ref(false)

const confirmarEliminar = id => eliminar(id).then(()=> confirmar.value = false)

</script>

<template>
<Row>
<h3>Odontogramas</h3>
</Row>

<Item v-for="item of registroodonto" :key="item.id" :item="item">
    <Col>{{item.tipo}}</Col>
    <Col>{{item.fechaRegistro}}</Col>
    <Col>
       <Button @click="dialog=true, leerEnRegistro(item.id)"> Editar </Button>
    </Col>
    <Col>
        <Button @click="confirmar == false ? confirmar = true : confirmarEliminar(item.id) ">  {{confirmar ? '¿Está seguro?' : 'Borrar'}} </Button>
    </Col>
</Item>

</template>

