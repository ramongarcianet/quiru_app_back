<script setup>
import { onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { item, guardar, actualizar, limpiar, leerEnRegistro, obtenerTodos, registro, updateEstado } from "../../store/paciente";
import RegistroOdontograma from "../5.Odontograma/RegistroOdontograma.vue";
import { guardar as guardarOdontograma, registroodonto, obtenerTodos as obtenerOdontograma } from "../../store/formodontograma";
import { printHistoriaClinicaPaciente } from "../../store/historiaClinica";
const obtenerRegistro = obtenerTodos();
const confirmar = ref(false);
let itemseleccionado = {};
function avisoHistorico() {
  var modal = document.getElementById('id03');
  modal.style.display = 'block';
}
function cerrarAvisoHistorico() {
  var modal = document.getElementById('id03');
  modal.style.display = 'none';
  guardarOdontograma(route.params.idPaciente, 'Diagnóstico','No')
}
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
    updateEstado(itemseleccionado).then(() => back())
  }
}
function Cancelar() {
  var alerta = document.getElementById("alerta");
  var modal = document.getElementById('id01');
  var modal3 = document.getElementById('id03');
  modal3.style.display = "none";
  alerta.style.display = "none";
  modal.style.display = 'none';
}
const route = useRoute()
const { back, push } = useRouter()
let obtener
if (route.params.idPaciente) {
  leerEnRegistro(route.params.idPaciente)
}
onUnmounted(() => {
  //limpiar()
  if (obtener) obtener();
})
const visible = ref(false) 

function printHistoriaClinica(idPaciente) {
    printHistoriaClinicaPaciente(idPaciente);

}
</script>

<template lang="pug">

#id01.modal(style="display:none;")
  .modal-content.modal-sm
    .container
      p(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") Eliminar Paciente
      p ¿Esta seguro que desea eliminar?
      .clearfix
        button.btn.btn-secondary.cancelbtn(@click="Cancelar()") Cancelar
        button.btn.btn-danger.deletebtn(@click="EliminarPaciente(), mostrar = false") Aceptar
#id03.modal(style="display:none;")
  .modal-content.modal-sm
    .container
      p(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") ¿Estás seguro? 
      p Si crea un nuevo diagnóstico, todos los anteriores se considerarán históricos.
      .clearfix
        button.btn.btn-secondary.cancelbtn(@click="Cancelar()") Cancelar
        button.btn.btn-danger.deletebtn(@click="cerrarAvisoHistorico()") Aceptar
.row
  .col-4.col-md-8
    button.btn.btn-outline-primary.border-0.pb-md-0(title='Volver' @click="push({ name: 'pacientes', params: {} })" )
      i.fa-solid.fa-arrow-left-long.fa-xl
  .col-8.col-md-3
#alerta.alert.alert-danger.alert-dismissible(style='display:none')
  strong Cuidado!
    |  Este paciente no se puede eliminar por que tiene un diagnostico/tratamiento registrado
  a.close(@click="Cancelar()" href='#' data-dismiss='alert' aria-label='close') &times;
.row
  .col.col-md-4
    .card
      .card-header
        .row
          .col-6
            nav.navbar.navbar-expand-lg.bg-light(style='background-color:transparent !important;')
              h1(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") Paciente
          .col-6
            .dropdown.d-flex.justify-content-end.mt-1
              a.btn.btn-primary(href='#' role='button' data-bs-toggle='dropdown' style="background-color: #00000008")
                i.fa.fa-ellipsis-v.fa-xl(style="color: var(--color-primary)")
              ul.dropdown-menu(style="cursor: pointer")
                li                    
                  a.dropdown-item(@click="push({name: 'Admision', params: { idPaciente: item.id }})") 
                    i.fa-solid.fa-file-circle-plus.fa-sm(style="color: var(--color-primary)")
                    |     Admisión
                li
                li                    
                  a.dropdown-item(@click="printHistoriaClinica(item.id)") 
                    i.fa-solid.fa-briefcase-medical.fa-sm(style="color: var(--color-primary)")
                    |     Imprimir historia
                li
                li
                  a.dropdown-item(@click="push({ name: 'paciente', params: { idPaciente: item.id } })") 
                    i.fa-solid.fa-pen-to-square.fa-sm(style="color: var(--color-primary)")
                    |     Editar paciente
                li
                li
                  a.dropdown-item(@click="CallConfirm(item)") 
                    i.fa-regular.fa-trash-can.fa-sm(style="color: var(--color-primary)")
                    |     Eliminar paciente  
      .card-body
        Form.mt-md-4
          label.form-label.mt-2 Nombre del paciente
          .input-group.pb-md-3
            input.form-control(v-model="item.nombre", disabled)
            input.form-control(v-model="item.apellidoPaterno", disabled)
            input.form-control(v-model="item.apellidoMaterno", disabled)
          label.form-label Documento de identidad
          .input-group.mb-md-3
            select.form-select(v-model="item.tipoDocumento", disabled)
              option(value="DNI") DNI
              option(value="CE") CARNET DE EXTRANJERIA
            input.form-control(v-model="item.numeroDocumento", disabled)
    .col-12.mx-auto.my-3(v-if="item.visto == 0")
      button.w-100.text-white.text-start.btn.btn-primary.d-flex.justify-content-between.px-5.align-items-center(style="border-radius: 50px" @click="guardarOdontograma(route.params.idPaciente, 'Diagnóstico','No')")
        div
          strong(style="color: white") Crear Nuevo
          p.mb-0(style="color: white") Diagnóstico
        i.fa-solid.fa-teeth-open.fa-xl
    .col-12.mx-auto.my-3(v-if="item.visto == 1")
      button.w-100.text-white.text-start.btn.btn-primary.d-flex.justify-content-between.px-5.align-items-center(style="border-radius: 50px" @click="avisoHistorico()")
        div
          strong(style="color: white") Crear Nuevo
          p.mb-0(style="color: white") Diagnóstico
        i.fa-solid.fa-teeth-open.fa-xl
  .col.col-md-8
    .card
      .card-header
        .d-flex.align-content-start.flex-wrap
          h1(style="color: #37DFBB; font-size: 1em; font-family: var(--font-family)") Lista de
            h1(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") odontogramas
      .card-body
        RegistroOdontograma
</template>
<style scoped>
#id01 {
  background-color: rgba(0, 0, 0, 0.6);
}

#id03 {
  background-color: rgba(0, 0, 0, 0.6);
}
.cancelbtn,
.deletebtn {
  float: left;
  width: 50%;
}

.cancelbtn {
  background-color: rgb(189, 189, 189);

}

.deletebtn {
  background-color: #f44336;
}

.container {
  padding: 16px;
  text-align: center;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  opacity: 1;
  padding-top: 50px;

}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto;
  border: 1px solid #888;
  width: 80%;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

.close {
  position: relative;
  font-size: 20px;
  font-weight: bold;
  color: black;
}

.close:focus {
  cursor: pointer;
}

.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

@media screen and (max-width: 300px) {

  .cancelbtn,
  .deletebtn {
    width: 100%;
  }
}
</style>
