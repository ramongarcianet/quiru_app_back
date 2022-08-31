<script setup>
import { onUnmounted, ref } from "vue";
import { useRoute, useRouter} from "vue-router";
import { item, guardar, actualizar, limpiar, leerEnRegistro, obtenerTodos, registro, updateEstado } from "../../store/paciente";
import RegistroOdontograma from "../5.Odontograma/RegistroOdontograma.vue";
import { guardar as guardarOdontograma, registroodonto, obtenerTodos as obtenerOdontograma } from "../../store/formodontograma";
import Seguro from "../../components/uikit/Seguro.vue";
const obtenerRegistro = obtenerTodos();
const confirmar = ref(false);
let itemseleccionado = {};
function CallConfirm(item) {
    itemseleccionado = item;
    obtenerOdontograma(item.id);
    var modal = document.getElementById('id01');
    modal.style.display = 'block';
}
function EliminarPaciente() {
    var alerta = document.getElementById("alerta");
    var modal = document.getElementById('id01');
    if (registroodonto.value.length > 0) {
        alerta.style.display = "block";
        modal.style.display = 'none';
    }
    else {
        alerta.style.display = "none";
        modal.style.display = 'none';
        updateEstado(itemseleccionado).then(()=>back())
    }
}
function Cancelar() {
    var alerta = document.getElementById("alerta");
    var modal = document.getElementById('id01');
        alerta.style.display = "none";
        modal.style.display = 'none';
}
const route = useRoute()
const {back, push} = useRouter()
let obtener
if (route.params.idPaciente) {
  leerEnRegistro(route.params.idPaciente)
}
onUnmounted(()=> {
  //limpiar()
  if (obtener) obtener();
})
</script>

<template lang="pug">
Seguro
.row
  .col-4.pb-2.col-md-9
    h1.my-0(style="color: #395D56; font-size: 1.5em; font-family: var(--font-family)") Ver
    h1(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") paciente
    button.btn.btn-outline-primary.border-0(@click="push({ name: 'pacientes', params: {} })" )
      ion-icon(name="return-down-back-outline" size="large")
  .col-8.col-md-3
    .col.ms-5
      button.ms-5.btn(title='Editar' @click="push({ name: 'paciente', params: { idPaciente: item.id } })")
        ion-icon(name="create-outline" size="large" style="color: var(--color-primary)")
      button.btn(title='Eliminar' @click="CallConfirm(item)")
        ion-icon(name="trash-outline" size="large" style="color: var(--color-primary)")
#alerta.alert.alert-danger.alert-dismissible(style='display:none')
    strong Cuidado!
        |  Este paciente no se puede eliminar por que tiene un diagnostico/tratamiento registrado
    a.close(@click="Cancelar()" href='#' data-dismiss='alert' aria-label='close') &times;
Form
  label.form-label Documento de identidad
  .input-group
    select.form-select(v-model="item.tipoDocumento", disabled)
      option(value="DNI") DNI
      option(value="CE") CARNET DE EXTRANJERIA
    input.form-control(v-model="item.numeroDocumento", disabled)
  label.form-label Nombre del paciente
  .input-group
    input.form-control(v-model="item.nombre", disabled)
    input.form-control(v-model="item.apellidoPaterno", disabled)
    input.form-control(v-model="item.apellidoMaterno", disabled)
.d-flex.align-content-start.flex-wrap.mt-3
  h1(style="color: #37DFBB; font-size: 1em; font-family: var(--font-family)") Lista de
    h1(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") odontogramas
.col-12.col-md-5.mx-auto.my-3
  button.w-100.text-white.text-start.btn.btn-primary.d-flex.justify-content-between.px-5.align-items-center(style="border-radius: 50px" @click="guardarOdontograma(route.params.idPaciente, 'Diagnóstico','2','0')")
        div
          strong(style="color: white") Crear
          p.mb-0(style="color: white") Nuevo Odontograma
        ion-icon(name="document-outline" style="color: white" size="large")
RegistroOdontograma
</template>

