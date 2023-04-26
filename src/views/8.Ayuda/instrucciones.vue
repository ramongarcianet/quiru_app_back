<script setup>
import ejemplos from '../../config/ejemplos.json';
$(document).ready(function () {
  $("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

function ocultarAyuda() {
  var verAyuda = document.getElementById("AyudaCard");
  verAyuda.style.display = "none"

}
</script>

<template lang="pug">
.row
  .col-11
    input#myInput.form-control.parpadea(style='border-color: rgb(57, 93, 86);' type='text' placeholder='Escriba una palabra para buscar en la lista el hallazgos')
  .col-1.p-0
    a(href='#SeccionPrincipal' style="color: black; cursor: default" id="act1" @click="ocultarAyuda()")
      i.fa-solid.fa-xmark.fa-xl(style="margin-top: 5px; margin-left: 10px")
span.m-1(style='font-weight: bold; font-size: 12px; color:rgb(57, 93, 86)') Pruebe diciendo un ejemplo, Quiru está escuchando
.Contenido  
  table.table.table-bordered.table-striped
    thead(style='position: sticky;top: 0')
      tr(style='background-color: white;')
        th.Cabecera Ejemplos de voz
        th.d-none.d-md-table-cell.Cabecera Norma técnica
    tbody#myTable.table-body
      tr(v-for='item of ejemplos.EJEMP' :key='item.orden' :item='item')
        td {{ item.orden }}
        td.d-none.d-md-table-cell {{ item.norma }}

</template>

<style>
.parpadea {

  animation-name: parpadeo;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  -webkit-animation-name: parpadeo;
  -webkit-animation-duration: 1s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}

@-moz-keyframes parpadeo {
  0% {
    opacity: 1.0;
  }

  50% {
    opacity: 0.0;
  }

  100% {
    opacity: 1.0;
  }
}

@-webkit-keyframes parpadeo {
  0% {
    opacity: 1.0;
  }

  50% {
    opacity: 0.0;
  }

  100% {
    opacity: 1.0;
  }
}

@keyframes parpadeo {
  0% {
    opacity: 1.0;
  }

  50% {
    opacity: 0.0;
  }

  100% {
    opacity: 1.0;
  }
}

.Cabecera {
  position: sticky;
  top: 0;
}

.Contenido {
  width: 100%;
  height: 300px;
  overflow: auto;
}
</style>