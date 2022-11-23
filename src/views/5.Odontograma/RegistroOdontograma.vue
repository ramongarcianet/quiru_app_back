<script setup>
import { onUnmounted, ref } from "vue";
import {registroodonto, eliminar} from "../../store/formodontograma";

import { useRouter, useRoute } from "vue-router";
const confirmar = ref(false);
const itemSeleccionado = ref({})
const { push } = useRouter();
const route = useRoute()

const confirmarEliminar = (id) => eliminar(id).then(() => {
  confirmar.value = false
  });


function CallConfirm2(item) {
    itemSeleccionado.value = item;
    var modal = document.getElementById('id02');
    modal.style.display = 'block';
}
function EliminarOdonto() {
    var alerto = document.getElementById("alerto");
    var modal = document.getElementById('id02');
    if (!itemSeleccionado.value.hallazgos || itemSeleccionado.value.hallazgos.length == 0) {
        alerto.style.display = "none";
        modal.style.display = 'none';
        eliminar(itemSeleccionado.value.id)
    }
    else {
        alerto.style.display = "block";
        modal.style.display = 'none';

    }
}
function Cancelar() {
    var alerto = document.getElementById("alerto");
    var modal = document.getElementById('id02');
        alerto.style.display = "none";
        modal.style.display = 'none';
}
function obtenerIdTratamiento(id) {
const diagnosticos =registroodonto.value.filter((elem) => elem.tipo == "Tratamiento" && elem.idRelacionado ==id);
if(diagnosticos.length > 0){
 return  diagnosticos[0].id
}
else 
  return id
}
function obtenerTipo(id) {
const diagnosticos =registroodonto.value.filter((elem) => elem.tipo == "Tratamiento" && elem.idRelacionado ==id);
if(diagnosticos.length > 0){
 return  "Tratamiento"
}
else 
  return "Diagnóstico"
}
// awa
</script>

<template lang="pug"> 
#id02.modal(style="display:none;")
    .modal-content.modal-sm
        .container
            p(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") Eliminar Odontograma
            p ¿Esta seguro que desea eliminar?
            .clearfix
                button.btn.btn-secondary.cancelbtn(@click="Cancelar()") Cancelar
                button.btn.btn-danger.deletebtn(@click="EliminarOdonto(), mostrar = false") Aceptar
#alerto.alert.alert-danger.alert-dismissible(style='display:none')
    strong Cuidado!
        |  Este Odontograma tiene hallazgos registrados
    a.close(@click="Cancelar()" href='#' data-dismiss='alert') &times;

template(v-for="item of registroodonto" :key="item.id" :item="item" )
  .card.mb-2.p-3(v-if="item.tipo === 'Diagnóstico'" style="border-radius: 40px; border-width: 2px" :style='item.estado=== "2" ? "border-color: var(--color-primary)":"border-color: #c2c3c4"' )
    .row(style="cursor: pointer" )
      .col-3.d-none.d-md-block(@click="push({name: 'Detalle', params: {idOdontograma: item.id,idPaciente: item.idPaciente, tipoOdonto:item.tipo} })") {{item.fechaRegistro.toDate().toISOString().slice(0, 10)}}
      //--------------------------------------------------------------------------------------------------------------------------------------------- Pc
      .col-3.d-none.d-md-block(@click="push({name: 'Detalle', params: {idOdontograma: item.id,idPaciente: item.idPaciente, tipoOdonto:item.tipo} })")  {{item.tipo}} 
      //--------------------------------------------------------------------------------------------------------------------------------------------- Móvil
      .col-6.d-block.d-md-none(@click="push({name: 'Detalle', params: {idOdontograma: item.id,idPaciente: item.idPaciente, tipoOdonto:item.tipo} })")  {{item.fechaRegistro.toDate().toISOString().slice(0, 10)}} {{item.tipo}}
      //--------------------------------------------------------------------------------------------------------------------------------------------- Alternativa
      .col-3.d-none.d-md-block(@click="push({name: 'Detalle', params: {idOdontograma: obtenerIdTratamiento(item.id),idPaciente: item.idPaciente, tipoOdonto: obtenerTipo(item.id)} })") {{(obtenerTipo(item.id) == "Diagnóstico" )? "" : "Tratamiento"}} 
      //------------------------------------------------------------------------------------------------------------------------------------ Muela
      .col-2.col-md-1
      .col-2.col-md-1(v-if="item.estado==='2'")
        button.btn(title='Eliminar' @click="CallConfirm2(item)")
          i.fa.fa-trash-o
      .col-2.col-md-1(v-else="item.estado==='1'")
        button.ms-auto.btn(type="button", disabled)
          i.fa.fa-trash-o
      //.col-2.col-md-1(v-if="item.estado==='2'")
        i.fa-solid.fa-circle.primary-text
      //.col-2.col-md-1(v-else="item.estado==='1'")
        i.fa-solid.fa-circle(style="color: #8c8c8c")

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
