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
table.table.table-striped.table-light
    thead 
        tr
            th Tip Doc.
            th Número Doc.
            th Nombres
            th Fecha Nac.
            th Sexo
            th 

    tbody
        tr(v-for="item of registro"  :key="item.id"  :item="item")
            td {{(item.tipoDocumento=='DNI')? 'DNI': 'CARNET DE EXTRANJERIA'}}
            td {{item.numeroDocumento}}
            td {{item.nombre+ ' '+item.apellidoPaterno +' '+item.apellidoMaterno }}
            td {{item.fechaNacimiento}}
            td {{(item.sexo=='M')?'MASCULINO':'FEMENINO'}}
            td 
                .dropdown
                    button.btn.btn-primary.dropdown-toggle#dropdownMenuLink(data-bs-toggle="dropdown") Opciones
                    ul.dropdown-menu
                        li 
                            a.dropdown-item( @click="push({name: 'odontograma', params: {idPaciente: item.id} })") Ver atenciones 
                        li
                            a.dropdown-item( @click="dialog=true, leerEnRegistro(item.id)" ) Editar
                        li
                            a.dropdown-item( @click="confirmar == false ? confirmar = true : confirmarEliminar(item.id)" ) {{confirmar ? '¿Está seguro?' : 'Borrar'}} 
           
</template>
