<script setup>
import { ref } from "vue";
import { item} from "../../store/paciente";
</script>

<template>
    <form>
      <Col>
        <Row>
          <Col>
            <select placeholder="Ubigeo" v-model="item.tipoDocumento">
              <option value="DNI">DNI</option>
              <option value="CE">CARNET DE EXTRANJERIA</option>
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
          />
          </Col>
          <Col>
            <input placeholder="Apellido paterno" v-model="item.apellidoPaterno" required
            />
          </Col>
          <Col>
            <input  placeholder="Apellido materno"  v-model="item.apellidoMaterno" required
            />
          </Col>
        </Row>
        <Row>
            <Col>
                <input type="date" v-model="item.fechaNacimiento">
            </Col>
          <Col>
            <select placeholder="Ubigeo" v-model="item.sexo">
              <option value="M">MASCULINO</option>
              <option value="F">FEMENINO</option>
            </select>
          </Col>
          <Col>
              <input placeholder="Departamento" v-model="item.departamento" required
            />
          </Col>
        </Row>
        <Row>
            <Col>
            <input  placeholder="Dirección"  v-model="item.Direccion" required
            />
            </Col>
        </Row>
        <Row>
          <Col>
            <input placeholder="Correo Electrónico" v-model="item.email" type='email'  required>
        </Col>
          <Col>
            <input placeholder="Teléfono" v-model="item.telefono" required
            />
          </Col>
          <Col>
            <input placeholder="Constancia informado" v-model="item.constancia" required
            />
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
      </Col>
    </form>
</template>

