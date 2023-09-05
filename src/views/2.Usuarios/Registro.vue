<script setup>
import { onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {obtenerTodos, registro, leerEnRegistro, eliminar} from '../../store/usuario'
const obtenerRegistro = obtenerTodos()
const confirmar = ref(false)
const confirmarEliminar = id => eliminar(id).then(()=> confirmar.value = false)
const {push} = useRouter()
</script>

<template lang="pug">
table.table.table-striped.table-light
  thead
    tr
      th Tip Doc.
      th Número Doc.
      th Nombres
      th Ape. Paterno
      th Ape. Materno
      th Correo
      th Sexo
      th
  tbody
    tr( v-for="item of registro"  :key="item.id"  :item="item" )
      td {{item.tipoDocumento}}
      td {{item.numeroDocumento}}
      td {{item.nombre}}
      td {{item.apellidoPaterno}}
      td {{item.apellidoMaterno}}
      td {{item.email}}
      td {{item.sexo}}
      td
        .dropdown
          button.btn.btn-primary.dropdown-toggle#dropdownMenuLink(data-bs-toggle="dropdown") Eliminar
          ul.dropdown-menu
            //li
              a.dropdown-item( @click="push({name: 'usuario', params: {idUsuario: item.id}}) " ) Editar
            li
              a.dropdown-item( @click="confirmar == false ? confirmar = true : confirmarEliminar(item.id) " ) {{confirmar ? '¿Está seguro?' : 'Confirmación'}}

</template>

