<script setup>
import { ref } from "vue";
import { item, guardar, actualizar, limpiar, leerEnRegistro, obtenerTodos, registro, updateEstado } from "../../store/paciente";
import { guardar as guardarOdontograma, registroodonto, obtenerTodos as obtenerOdontograma } from "../../store/formodontograma";
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
        //updateEstado(itemseleccionado).then(()=>back())
    }
}
function Cancelar() {
    var alerta = document.getElementById("alerta");
    var modal = document.getElementById('id01');
        alerta.style.display = "none";
        modal.style.display = 'none';
}
let obtener
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
</template>
<style scoped>
body {
font-family: Arial, Helvetica, sans-serif;
}

* {
box-sizing: border-box;
}

#id01 {
background-color: rgba(0, 0, 0, 0.6);
}

button {
margin-top: -4px;
border: none;
opacity: 0.85;
background: none;
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