<script setup>
import { onUnmounted, ref } from 'vue'
import {registroodonto, leerEnRegistro, eliminar, dialog} from '../../store/formodontograma'
import { useRouter } from 'vue-router'
const confirmar = ref(false)

const confirmarEliminar = id => eliminar(id).then(()=> confirmar.value = false)
const {push} = useRouter()
/*if( route.params.idPaciente) {
  obtener = obtenerTodos( route.params.idOdontograma )
}*/
</script>

<template>
<Row>
<h3>Odontogramas</h3>
</Row>

<Item v-for="item of registroodonto" :key="item.id" :item="item">
    <Col>{{item.tipo}}</Col>
    <Col>{{item.fechaRegistro}}</Col>
     <Col>
            <Button @click="push({name: 'Detalle', params: {idOdontograma: item.id} })"> Ver atenciones </Button>
    </Col>
    <Col>
        <Button @click="confirmar == false ? confirmar = true : confirmarEliminar(item.id) ">  {{confirmar ? '¿Está seguro?' : 'Borrar'}} </Button>
    </Col>
</Item>

</template>

