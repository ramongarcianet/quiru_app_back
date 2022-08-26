<script setup>
import { injectProp } from '@vue/compiler-core';
import { onUnmounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { obtenerTodos, registro, updateEstado } from "../../store/paciente";
import { previousPage, nextPage, setList, registro_, search, setListDelete, SetPage } from "../../config/Paginator";
import { registroodonto, obtenerTodos as obtenerOdontograma } from "../../store/formodontograma";
const obtenerRegistro = obtenerTodos();
const confirmar = ref(false);
const { push } = useRouter();
let itemseleccionado = {};
watch(
    () => registro.value,
    () => {
        setList(registro.value, 1);
    }
)
</script>

<template lang="pug">
.row
    .col-5
    .col-7
        input#SearchInput.form-control.mb-2.ms-auto(v-on:keyup='search(registro)', placeholder="Buscar")
.div.mb-5(style="background-color: white; border-radius: 2%;")
    table.table.table-hover(style="cursor: pointer")
        tbody
            tr(v-for="item of registro_"  :key="item.id"  :item="item" @click="push({ name: 'pacienteVer', params: { idPaciente: item.id } })")
                td.d-none.d-md-table-cell {{ item.numeroDocumento }}
                td
                    span.d-block.d-md-none {{ item.numeroDocumento }}
                    | {{ item.nombre + ' ' + item.apellidoPaterno + ' ' + item.apellidoMaterno }}
                td.dropdown
                    button.ms-auto.btn(title='Odontograma')
                        i.fa.fa-solid.fa-tooth
    .div(v-if="registro.length > 8",style="text-align: center;")
        nav.d-flex.justify-content-center(aria-label='Page navigation example')
            ul.pagination
                li.page-item
                    a.page-link(href='#', aria-label='Previous', @click="previousPage(registro)")
                        span(aria-hidden='true',style="font-size: 1rem; font-weight: bold;") &laquo;
                li.page-item(v-for="n in (Math.trunc(registro.length / 8) + (((registro.length % 8) > 0) ? 1 : 0))") 
                    a.page-link(href='#', @click='SetPage(registro, n)') {{ n }}    
                li.page-item
                    a.page-link(href='#', aria-label='Next', @click="nextPage(registro)")
                        span(aria-hidden='true', style="font-size: 1rem; font-weight: bold;") &raquo;
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
