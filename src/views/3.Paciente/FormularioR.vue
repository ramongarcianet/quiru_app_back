<script setup>
import { ref } from "vue";
import { regpasciente} from "../../store/formodontograma";
</script>

<template>
    <form>
      <Col>
        <Row>
          <Col>
            <select placeholder="Ubigeo" v-model="regpasciente.tipoDocumento">
              <option value="DNI">DNI</option>
              <option value="CE">CARNET DE EXTRANJERIA</option>
            </select>
          </Col>
          <Col>
            <input
              placeholder="Número documento"
              v-model="regpasciente.numeroDocumento"
              required
          /></Col>
        </Row>
        <Row>
          <Col>
            <input placeholder="Nombre" v-model="regpasciente.nombre" required
          />
          </Col>
          <Col>
            <input placeholder="Apellido paterno" v-model="regpasciente.apellidoPaterno" required
            />
          </Col>
          <Col>
            <input  placeholder="Apellido materno"  v-model="regpasciente.apellidoMaterno" required
            />
          </Col>
        </Row>
        <Row>
            <Col>
                <input type="date" v-model="regpasciente.fechaNacimiento">
            </Col>
          <Col>
            <select placeholder="Ubigeo" v-model="regpasciente.sexo">
              <option value="M">MASCULINO</option>
              <option value="F">FEMENINO</option>
            </select>
          </Col>
          <Col>
              <input placeholder="Departamento" v-model="regpasciente.departamento" required
            />
          </Col>
        </Row>
        <Row>
            <Col>
            <input  placeholder="Dirección"  v-model="regpasciente.Direccion" required
            />
            </Col>
        </Row>
        <Row>
          <Col>
            <input placeholder="Correo Electrónico" v-model="regpasciente.email" type='email'  required>
        </Col>
          <Col>
            <input placeholder="Teléfono" v-model="regpasciente.telefono" required
            />
          </Col>
          <Col>
            <input placeholder="Constancia informado" v-model="regpasciente.constancia" required
            />
          </Col>
        </Row>
        <Row>
            <Col>
            <input
              placeholder="Comentario"
              v-model="regpasciente.Comentario"
            />
            </Col>
        </Row>
      </Col>
    </form>
</template>

