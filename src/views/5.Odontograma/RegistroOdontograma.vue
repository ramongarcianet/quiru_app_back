<script setup>
import { onUnmounted, ref } from "vue";
import {
  registroodonto,
  leerEnRegistro,
  eliminar,
  dialog,
} from "../../store/formodontograma";
import { useRouter } from "vue-router";
const confirmar = ref(false);

const confirmarEliminar = (id) => eliminar(id).then(() => (confirmar.value = false));
const { push } = useRouter();
/*if( route.params.idPaciente) {
  obtener = obtenerTodos( route.params.idOdontograma )
}*/
</script>

<template lang="pug">
row
  h3 Odontogramas
  table.table.table-striped
    thead 
      tr
        th Tipo
        th Fecha
        th
    tbody
      tr(v-for="item of registroodonto" :key="item.id" :item="item")
        td {{item.tipo}}
        td {{item.fechaRegistro}}
        td
          .dropdown
            button.btn.btn-primary.dropdown-toggle#dropdownMenuLink(data-bs-toggle="dropdown") Opciones
            ul.dropdown-menu
              li 
                a.dropdown-item(@click="push({name: 'Detalle', params: {idOdontograma: item.id} })") Ver atenciones
              li
                a.dropdown-item(@click="confirmar == false ? confirmar = true : confirmarEliminar(item.id) ") {{confirmar ? '¿Está seguro?' : 'Borrar'}}
           
</template>
