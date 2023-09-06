<script setup>
import { onUnmounted, ref,watch } from "vue";
import { collection } from "@firebase/firestore";
import { useRouter, useRoute } from "vue-router";
import { obtenerTodos as obtenerTodosOD, item as itemOD, registro_ as registroOD, eliminar } from "../../store/AdminOdotogramas";
import  Registro from "../2.Usuarios/Registro.vue" ;
//import { obtenerTodos as obtenerTodosUS, item as itemUS, registro as registroUS} from "../../store/AdminUsuarios";
const {push, back} = useRouter();
const confirmar = ref(false);
const itemSeleccionado = ref({})
const route = useRoute()
function convertToCSV(objArray) {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';
  for (var i = 0; i < array.length; i++) {
    var line = '';
    for (var index in array[i]) {
      if (line != '') line += ','
      line += array[i][index];
    }
    str += line + '\r\n';
  }
  return str;
}
function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
      items.unshift(headers);
    }
    var jsonObject = JSON.stringify(items);
    var csv = convertToCSV(jsonObject);
    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilenmae);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
}

function downloadOD(){
  var headers = {
    id: "ID odontograma",
    fecha: "Fecha de Registro",
    userId: "User id",
    numeroHallazgos: "Hallazgos"
  };

  var itemsFormatted = [];
  registroOD.value.forEach((item) => {
    var day = new Date(item.fechaRegistro.seconds * 1000);
    var optionsDay = { year: 'numeric', month: 'long', day: 'numeric' };
    var formatter = new Intl.DateTimeFormat('es-ES', optionsDay);
    var formattedDate = formatter.format(day);
    itemsFormatted.push({
      id: item.id,
      fechaRegistro: formattedDate,
      userId: item.userId,
      numeroHallazgos: item.hallazgos?.length
    });
  });
  var fileTitle = 'Odontogramas de Quiru';
  exportCSVFile(headers, itemsFormatted, fileTitle);
}

/*function downloadUS(){
  var headers = {
    id: "ID usuario",
    nombre: "Nombre",
    apellidoPaterno: "Apellido materno",
    apellidoMaterno: "Apellido paterno",
    fechaNacimiento: "Fecha de nacimiento",
    tipoDocumento: "Tipo doc.",
    numeroDocumento: "Número doc.",
    sexo: "Sexo",
    numeroTlf: "Núm. teléfonico",
    email: "Email"
  };

  var itemsFormatted = [];
  registroUS.value.forEach((item) => {
    itemsFormatted.push({
      id: item.id,
      nombre: item.nombre,
      apellidoPaterno: item.apellidoPaterno,
      apellidoMaterno: item.apellidoMaterno,
      fechaNacimiento: item.fechaNacimiento,
      tipoDocumento: item.tipoDocumento,
      numeroDocumento: item.numeroDocumento,
      sexo: item.sexo,
      numeroTlf: item.numeroTlf,
      email: item.email
    });
  });
  var fileTitle = 'Usuarios de Quiru';
  exportCSVFile(headers, itemsFormatted, fileTitle);
}*/

function CallConfirm2(item) {
  itemSeleccionado.value = item;
  var modal = document.getElementById('id02');
  modal.style.display = 'block';
}
function EliminarOdonto() {
  var modal = document.getElementById('id02');
  modal.style.display = 'none';
  eliminar(itemSeleccionado.value.id)
}
function Cancelar() {
  var modal = document.getElementById('id02');
  modal.style.display = 'none';
}
function borrarTodos() {
  const vacios = registroOD.value.filter(re => !re.hallazgos)
  vacios.forEach(element => eliminar(element.id))
}
obtenerTodosOD()
//obtenerTodosUS()
</script>
<template lang="pug">
#id02.modal(style="display:none;")
  .modal-content.modal-sm
    .container
      p(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") Eliminar Odontograma
      p ¿Esta seguro que desea eliminar?
      .clearfix
        button.btn.btn-secondary.cancelbtn(@click="Cancelar()") Cancelar
        button.btn.btn-danger.deletebtn(@click="EliminarOdonto()") Aceptar
.mt-4
  button.btn.btn-outline-primary.border-0( @click="back()")
    i.fa-solid.fa-arrow-left-long.fa-xl
.accordion-item.border.border-0.rounded-0
  h2.accordion-header
    button.accordion-button.collapsed(type='button' data-bs-toggle='collapse' data-bs-target='#SeccionOdo')
      | Registro general de Odontogramas
  #SeccionOdo.accordion-collapse.collapse(data-bs-parent='#accordion1')
    .accordion-body
      .card.mb-1(style="border-radius: 30px; background-color:var(--color-light) !important;")
        .row.p-1(style="color:rgb(57, 93, 86);font-weight: bold;")
          .col-2.ps-4 Nro. hallazgos
          .col-3 ID odontograma
          .col-3 ID del usuario
          .col-3
          .col-1
      .card.my-2.p-2(v-for="itemOD of registroOD"  :key="itemOD.id"  :itemOD="itemOD" style="border-radius: 40px" :style='itemOD.nombre === "" ? "border-color: #c6c1c1 ":"border-color: var(--color-primary)"')
        .row.p-1
          .col-2(v-if="!itemOD.hallazgos" style="font-style: italic; color: #7e7b7b ") sin hallazgos
          .col-2(v-else style="color: black ") Tiene {{ itemOD.hallazgos.length }} hallazgo(s)
          .col-3 {{itemOD.id}}
          .col-4 {{itemOD.userId}}
          .col-2
          //(@click="push({ name: 'odontograma', params: { idOdontograma: itemOD.id } })" style="color:#18b290; cursor: pointer") Ver Odontograma 
          .col-1.dropdown
            button.ms-auto.btn(title='eliminar' @click="CallConfirm2(itemOD)")
              i.fa.fa-solid.fa-trash
      .col
        button.btn.btn-outline-dark.border.border-dark.m-2(@click='borrarTodos()') Borrar vacios
        button.btn.btn-outline-dark.border.border-dark.m-2(@click='downloadOD()') Imprimir información de Odontogramas
.accordion-item.border.border-0.rounded-0.my-2
  h2.accordion-header
    button.accordion-button.collapsed(type='button' data-bs-toggle='collapse' data-bs-target='#SeccionUsu')
      | Registro general de Usuarios
  #SeccionUsu.accordion-collapse.collapse(data-bs-parent='#accordion2')
    .accordion-body
      Registro
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

#id02 {
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