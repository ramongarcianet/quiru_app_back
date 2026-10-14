<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { item, guardar, actualizar, limpiar, leerEnRegistro, obtenerTodos, registro, updateEstado } from "../../store/paciente";
import RegistroOdontograma from "../5.Odontograma/RegistroOdontograma.vue";
import { guardar as guardarOdontograma, registroodonto, obtenerTodos as obtenerOdontograma } from "../../store/formodontograma";
import { printHistoriaClinicaPaciente, printHistoriaMedicaPaciente } from "../../store/historiaClinica";
const obtenerRegistro = obtenerTodos();
const confirmar = ref(false);
const visible = ref(false);
const menuPaciente = ref(null);
let itemseleccionado = {};
function toggleMenuPaciente() {
  visible.value = !visible.value;
}
function cerrarMenuPaciente() {
  visible.value = false;
}
function handleClickOutside(event) {
  if (!menuPaciente.value) return;
  if (!menuPaciente.value.contains(event.target)) {
    cerrarMenuPaciente();
  }
}
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
  cerrarMenuPaciente();
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
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  //limpiar()
  if (obtener) obtener();
})

function printHistoriaClinica(idPaciente) {
  cerrarMenuPaciente();
  printHistoriaClinicaPaciente(idPaciente)
}
function printHistoriaMedica(idPaciente) {
  cerrarMenuPaciente();
  printHistoriaMedicaPaciente(idPaciente)
}
</script>

<template lang="pug">

#id01.modal(style="display:none;")
  .modal-content.modal-sm
    .container
      p.modal-title Eliminar paciente
      p ¿Esta seguro que desea eliminar?
      .clearfix
        button.btn.btn-secondary.cancelbtn(@click="Cancelar()") Cancelar
        button.btn.btn-danger.deletebtn(@click="EliminarPaciente(), mostrar = false") Aceptar
#id03.modal(style="display:none;")
  .modal-content.modal-sm
    .container
      p.modal-title ¿Estás seguro?
      p Si crea un nuevo diagnóstico, todos los anteriores se considerarán históricos.
      .clearfix
        button.btn.btn-secondary.cancelbtn(@click="Cancelar()") Cancelar
        button.btn.btn-danger.deletebtn(@click="cerrarAvisoHistorico()") Aceptar
.row.mt-4
  .col-4.col-md-8
    button.btn.btn-outline-primary.border-0.pb-md-0(title='Volver' @click="push({ name: 'pacientes', params: {} })" )
      i.bi.bi-arrow-left.fs-3
  .col-8.col-md-3
#alerta.alert.alert-danger.alert-dismissible(style='display:none')
  strong Cuidado!
    |  Este paciente no se puede eliminar por que tiene un diagnostico/tratamiento registrado
  a.close(@click="Cancelar()" href='#' data-dismiss='alert' aria-label='close') &times;
.row
  .col.col-md-4
    .card
      .card-header(style='background-color:var(--color-light) !important;')
        .row
          .col-6
            nav.navbar.navbar-expand-lg.bg-light(style='background-color:var(--color-light) !important;')
              h2.clinical-heading Información del paciente
          .col-6
            .dropdown.d-flex.justify-content-end.mt-1.position-relative(ref="menuPaciente")
              button.btn.p-0.border-0.bg-transparent(
                type='button'
                @click.stop="toggleMenuPaciente()"
                :aria-expanded="visible ? 'true' : 'false'"
              )
                i.bi.bi-three-dots-vertical.fs-3.p-3(style="color: var(--color-primary)")
              ul.dropdown-menu.dropdown-menu-end.show(v-if="visible" style="cursor: pointer")
                li                    
                  a.dropdown-item(@click="cerrarMenuPaciente(); push({name: 'Admision', params: { idPaciente: item.id }})") 
                    i.bi.bi-file-earmark-plus(style="color: var(--color-primary)")
                    |     Admisión
                li
                li                    
                  a.dropdown-item(@click="printHistoriaClinica(item.id)") 
                    i.bi.bi-briefcase(style="color: var(--color-primary)")
                    |     Imprimir historia clínica
                li
                li                    
                  a.dropdown-item(@click="printHistoriaMedica(item.id)") 
                    i.bi.bi-briefcase(style="color: var(--color-primary)")
                    |     Imprimir historia médica general
                li
                li
                  a.dropdown-item(@click="cerrarMenuPaciente(); push({ name: 'paciente', params: { idPaciente: item.id } })") 
                    i.bi.bi-pencil-square(style="color: var(--color-primary)")
                    |     Editar paciente
                li
                li
                  a.dropdown-item(@click="CallConfirm(item)") 
                    i.bi.bi-trash(style="color: var(--color-primary)")
                    |     Eliminar paciente  
      .card-body
        Form.mt-md-4
          label.form-label.mt-2 Nombres y apellidos
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
        i.bi.bi-clipboard2-pulse.fs-3
    .col-12.mx-auto.my-3(v-if="item.visto == 1")
      button.w-100.text-white.text-start.btn.btn-primary.d-flex.justify-content-between.px-5.align-items-center(style="border-radius: 50px" @click="avisoHistorico()")
        div
          strong(style="color: white") Crear Nuevo
          p.mb-0(style="color: white") Diagnóstico
        i.bi.bi-clipboard2-pulse.fs-3
  .col.col-md-8
    .card
      .card-header(style='background-color:var(--color-light) !important;')
        .d-flex.align-content-start.flex-wrap
          h2.clinical-heading Lista de odontogramas
      .card-body
        RegistroOdontograma
</template>
<style scoped>
.clinical-heading {
  margin: 0;
  color: var(--brand-navy);
  font-size: 1.15rem;
  font-weight: 750;
}

.card {
  border-color: var(--color-border);
  border-radius: var(--radius-card);
  box-shadow: none;
}

.card-header {
  background: #f8faff !important;
  border-color: var(--color-border);
}

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
