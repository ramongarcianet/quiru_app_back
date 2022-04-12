<script setup>
import { ref } from "vue";
import { item, guardar, actualizar, dialog } from "../../store/diccionario";

const guardarOActualizar = () => {
  if (item.value.id) actualizar(item.value).then(() => (item.value = {}));
  else guardar(item.value).then(() => (item.value = {}));
};

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
          <Button type="button" @click="dialog = false"> Cancelar </Button>
          <Button> Guardar</Button>
        </Row>
      </Col>
    </form>
  </dialog>
</template>

