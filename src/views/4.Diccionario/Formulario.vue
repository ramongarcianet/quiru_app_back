<script setup>
import { ref } from "vue";
import { item, guardar, actualizar,limpiar, dialog } from "../../store/diccionario";

const guardarOActualizar = () => {
  if (item.value.id) actualizar(item.value).then(() => (limpiar()));
  else guardar(item.value).then(() => (limpiar()));
};
/*
const cancelar = () =>{
  dialog = false;
  limpiar();
};*/
</script>

<template>
  <dialog :open="$attrs.dialog">
    <form @submit.prevent="(e) => guardarOActualizar()">
      <Col>
        <Row>
          <Col>
            <input
              placeholder="Código"
              v-model="item.codigo"
              required
          />
          </Col>
          <Col>
            <input
              placeholder="Descripción"
              v-model="item.descripcion"
              required
          /></Col>
        </Row>

        <Row>
          <Col>
            <Button type="button" @click="dialog = false; limpiar() "> Cancelar </Button>
            <!-- <Button type="button" onClick="cancelar()"> Cancelar </Button> -->
          </Col>
          <Col>
            <Button> Guardar</Button>
          </Col>
        </Row>
      </Col>
    </form>
  </dialog>
</template>

