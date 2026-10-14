<script setup>
import { onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {obtenerTodos, registro, leerEnRegistro, desactivarUsuario} from '../../store/usuario'
const obtenerRegistro = obtenerTodos()
const {push} = useRouter()
const usuarioSeleccionado = ref({})
function CallConfirm3(item) {
  usuarioSeleccionado.value = item;
  var modal = document.getElementById('id03');
  modal.style.display = 'block';
}
function EliminarUsuario() {
  var modal = document.getElementById('id03');
  modal.style.display = 'none';
  desactivarUsuario(usuarioSeleccionado.value.id)
}
function Cancelar() {
  var modal = document.getElementById('id03');
  modal.style.display = 'none';
}
</script>

<template lang="pug">
#id03.modal(style="display:none;")
  .modal-content.modal-sm
    .container
      p(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") Eliminar Usuario
      p ¿Esta seguro que desea eliminar?
      .clearfix
        button.btn.btn-secondary.cancelbtn(@click="Cancelar()") Cancelar
        button.btn.btn-danger.deletebtn(@click="EliminarUsuario()") Aceptar
.card.mb-1(style="border-radius: 30px; background-color:var(--color-light) !important;")
  .row.p-1(style="color:rgb(57, 93, 86);font-weight: bold;")
    .col-2.ps-4 Doc. Identidad
    .col-3 Nombre
    .col-3 Email
    .col-2.ps-1 Teléfono
    .col-1.ps-1 Estado
    .col-1
.card.mb-2.p-2(v-for="item of registro"  :key="item.id"  :item="item" style="border-radius: 40px" :style='item.estado === false ? "border-color: #c6c1c1 ":"border-color: var(--color-primary)"')
  .row
    .col-2 {{item.tipoDocumento}} - {{item.numeroDocumento}}
    .col-3 {{item.nombre}} {{item.apellidoPaterno}} {{item.apellidoMaterno}}
    .col-3 {{item.email}}
    .col-2 {{item.numeroTlf}}
    .col-1(v-if="item.estado === true") Activo
    .col-1.dropdown(v-if="item.estado === true")
      button.ms-auto.btn(title='eliminar' @click="CallConfirm3(item)")
        i.bi.bi-trash
    .col-2(v-else) Desactivado
</template>
<style scoped>
.btn:disabled, .btn.disabled, fieldset:disabled .btn {
    opacity: 0.35;
}
button {
    margin-top: -4px;
    border: none;
    background: none;
}

ion-icon {
  pointer-events: none;
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
