<script setup>
import { onUnmounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import {
    obtenerTodos,
    eliminar,
    registro
} from "../../store/precios";
import {
    previousPage,
    nextPage,
    setList,
    registro_,
    search
} from "../../config/Paginator";
const obtenerRegistro = obtenerTodos();
const confirmar = ref(false);
const confirmarEliminar = (id) => eliminar(id).then(() => (confirmar.value = false));
const { push } = useRouter();
watch(
    () => registro.value,
    () => {
        setList(registro.value);
    }
)


</script>

<template lang="pug">

.div(style="background-color: white; border-radius: 2%;").mt-5
    table.table.table-hover
        thead
            tr
                th.d-table-cell.d-md-table-cell Hallazgo
                th.d-table-cell.d-md-table-cell Precio 
                
        tbody
            tr(v-for="item of registro_"  :key="item.id"  :item="item")
                td.d-table-cell.d-md-table-cell {{ item.tipo }}
                td.d-table-cell.d-md-table-cell {{ item.precio }}
                td.dropdown
                    button.ms-auto.btn( @click="push({ name: 'formulario', params: { idPaciente: item.id } })")
                        i.fa.fa-pencil-square-o(aria-hidden='true')
                td.dropdown
                    BotonSeguro( :onSuccess= '()=> eliminar(item.id)')
                        i.fa.fa-trash-o(aria-hidden='true' style="color: black;")

</template>

