<script setup>
import { onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  obtenerTodos,
  registro,
  leerEnRegistro,
  eliminar,
  dialog,
} from "../../store/paciente";

const obtenerRegistro = obtenerTodos();
const confirmar = ref(false);
const confirmarEliminar = (id) => eliminar(id).then(() => (confirmar.value = false));
const { push } = useRouter();
</script>

<template lang="pug">
table.table.table-striped.table-light.table-light
    thead
        tr
            th.d-none.d-md-table-cell Tip Doc.
            th.d-none.d-md-table-cell Número Doc.
            th Nombres
            th.d-none.d-md-table-cell Fecha Nac.
            th.d-none.d-md-table-cell Sexo
            th

    tbody
        tr(v-for="item of registro"  :key="item.id"  :item="item")
            td.d-none.d-md-table-cell {{(item.tipoDocumento=='DNI')? 'DNI': 'CARNET DE EXTRANJERIA'}}
            td.d-none.d-md-table-cell {{item.numeroDocumento}}
            td
                span.d-block.d-md-none {{item.numeroDocumento}} -
                | {{item.nombre+ ' '+item.apellidoPaterno +' '+item.apellidoMaterno }}
            td.d-none.d-md-table-cell {{item.fechaNacimiento}}
            td.d-none.d-md-table-cell {{(item.sexo=='M')?'MASCULINO':'FEMENINO'}}
            td
                .dropdown
                    button.btn.btn-primary.dropdown-toggle#dropdownMenuLink(data-bs-toggle="dropdown") Opciones
                    ul.dropdown-menu
                        li
                            a.dropdown-item( @click=" push({name: 'pacienteVer', params: {idPaciente: item.id} })" ) Ver
                        li
                            a.dropdown-item( @click=" push({name: 'paciente', params: {idPaciente: item.id} })" ) Editar
                        li
                            a.dropdown-item( @click="confirmar == false ? confirmar = true : confirmarEliminar(item.id)" ) {{confirmar ? '¿Está seguro?' : 'Borrar'}}

</template>
