<script setup>
import { ref } from "vue";
import { item, guardar, actualizar } from "../../store/paciente";

const guardarOActualizar = () => {
  if (item.value.id) actualizar(item.value).then(() => (item.value = {}));
  else guardar(item.value).then(() => (item.value = {}));
};

import { dialog } from "../../store/paciente";
</script>

<template>
  <dialog :open="$attrs.dialog">
    <form @submit.prevent="(e) => guardarOActualizar()">
      <Col>
        <Row>
          <Col>
            <select placeholder="Ubigeo" v-model="item.tipoDocumento">
              <option value="01">DNI</option>
              <option value="02">CARNET DE EXTRANJERIA</option>
            </select>
          </Col>
          <Col>
            <input
              placeholder="Número documento"
              v-model="item.numeroDocumento"
              required
          /></Col>
        </Row>
        <Row>
          <Col>
            <input placeholder="Nombre" v-model="item.nombre" required
          /></Col>
          <Col>
            <input
              placeholder="Apellido paterno"
              v-model="item.apellidoPaterno"
            />
          </Col>
          <Col>
            <input
              placeholder="Apellido materno"
              v-model="item.apellidoMaterno"
            />
          </Col>
        </Row>
        <Row>
            <Col>
                <input type="date" v-model="item.fechaNacimiento">
            </Col>
          <Col>
            <select placeholder="Ubigeo" v-model="item.sexo">
              <option value="01">FEMENINO</option>
              <option value="02">MASCULINO</option>
            </select>
          </Col>
          <Col>
            <select placeholder="Ubigeo" v-model="item.departamento">
              <option value="01">CUSCO</option>
              <option value="02">TRUJILLO</option>
            </select>
          </Col>
        </Row>
        <Row>
            <Col>
            <input
              placeholder="Dirección"
              v-model="item.Direccion"
            />
            </Col>
        </Row>
        <Row>
          <Col>
            <input placeholder="Email" v-model="item.email" required
          /></Col>
          <Col>
            <input
              placeholder="Teléfono"
              v-model="item.telefono"
            />
          </Col>
          <Col>
            <select placeholder="Constancia" v-model="item.constancia">
              <option value="01">SI</option>
              <option value="02">NO</option>
            </select>
          </Col>
        </Row>
        <Row>
            <Col>
            <input
              placeholder="Comentario"
              v-model="item.Comentario"
            />
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

