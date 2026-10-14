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
const totalRows = ref(0);
const currentPage = ref(1);
const perPage = ref(5);
const pageOptions = ref([5, 10, 15, { value: 100, text: 'Show a lot' }]);
let itemseleccionado = {};
const paginatedData = ref([]);
watch(
    () => registro.value,
    () => {
        totalRows.value = registro.value.length;
        const startIndex = (currentPage.value - 1) * perPage.value;
        const endIndex = startIndex + perPage.value;
        paginatedData.value = registro.value.slice(startIndex, endIndex);
    }
)


watch([currentPage, perPage], ([newCurrentPage, newPerPage]) => {
  var input, searchValue;
  const startIndex = (newCurrentPage - 1) * newPerPage;
  const endIndex = startIndex + newPerPage;
  input = document.getElementById("SearchInput");
  searchValue = input.value.toUpperCase();  
  if (searchValue != "") {
    let tempData = registro.value;
    let completo = "";
    tempData = tempData.filter((item) => {
            completo = item.tipoDocumento + ' ' + item.numeroDocumento + ' ' + item.nombre + ' ' + item.apellidoPaterno + ' ' + item.apellidoMaterno;
            return completo
                .toUpperCase()
                .includes(searchValue.toUpperCase())
        });
    paginatedData.value = tempData.slice(startIndex, endIndex);
  }else{
    paginatedData.value = registro.value.slice(startIndex, endIndex);
  }  
});

function searchData() {
    var input, searchValue;
    input = document.getElementById("SearchInput");
    searchValue = input.value.toUpperCase();
    let tempData = registro.value;
    let completo = "";
    const currentPageSr = 1;
    if (tempData != undefined) {
        tempData = tempData.filter((item) => {
            completo = item.tipoDocumento + ' ' + item.numeroDocumento + ' ' + item.nombre + ' ' + item.apellidoPaterno + ' ' + item.apellidoMaterno;
            return completo
                .toUpperCase()
                .includes(searchValue.toUpperCase())
        });
        totalRows.value = tempData.length;
        const startIndex = (currentPageSr - 1) * perPage.value;
        const endIndex = startIndex + perPage.value;
        paginatedData.value = tempData.slice(startIndex, endIndex);
    }
   
}
</script>
<template lang="pug">
    <b-container fluid>
    .row
        .col-5.d-none.d-md-block
            b-form-group.mb-0(label='Por página' label-for='per-page-select' label-cols-sm='3' label-cols-md='3' label-cols-lg='3' label-align-sm='right' label-size='mb')
                b-form-select#per-page-select(v-model='perPage' :options='pageOptions' size='mb')
        .col-7.d-none.d-md-block
            input#SearchInput.form-control.mb-2.ms-auto(v-on:keyup='searchData(registro)', placeholder="Buscar")
        .d-block.d-md-none
            input#SearchInput.form-control.mb-2.ms-auto(v-on:keyup='searchData(registro)', placeholder="Buscar")
    .div.mb-5
        .card.mb-1.d-none.d-md-block(style="border-radius: 30px; background-color:var(--color-light) !important;")
            .row.align-items-center.p-1(style="color:rgb(57, 93, 86);font-weight: bold;")
                .col-3.ps-4.d-none.d-md-block Doc. Identidad
                .col-3.d-none.d-md-block Nombre
                .col-2.d-none.d-md-block Teléfono
                .col-2.d-none.d-md-block Email
                .col-1
        .card.mb-2.p-2.d-block.d-md-none(v-for="item of paginatedData"  :key="item.id"  :item="item" @click="push({ name: 'pacienteVer', params: { idPaciente: item.id } })" style="border-radius: 40px")
            .row.align-items-center.p-1(style="cursor: pointer")
                .col-10 {{item.tipoDocumento + ' ' +item.numeroDocumento }}
                .col-1.dropdown(style="max-height: 24px")
                    button.ms-auto.btn.p-0.m-0(title='Odontograma')
                        i.bi.bi-person
                .col-10 {{ item.nombre + ' ' + item.apellidoPaterno + ' ' + item.apellidoMaterno }}

        .card.mb-2.p-2.d-none.d-md-block(v-for="item of paginatedData"  :key="item.id"  :item="item" style="border-radius: 40px" )
            .row.align-items-center.p-1(style="cursor: pointer")
                .col.ps-3(@click="push({ name: 'pacienteVer', params: { idPaciente: item.id } })") {{item.tipoDocumento}}
                .col-2(@click="push({ name: 'pacienteVer', params: { idPaciente: item.id } })") {{ item.numeroDocumento }}
                .col-3(@click="push({ name: 'pacienteVer', params: { idPaciente: item.id } })") {{ item.nombre + ' ' + item.apellidoPaterno + ' ' + item.apellidoMaterno }} 
                .col-2(@click="push({ name: 'pacienteVer', params: { idPaciente: item.id } })") {{item.telefono}}
                .col-2(@click="push({ name: 'pacienteVer', params: { idPaciente: item.id } })") {{item.email}}
                .col-1
                .col-1.dropdown
                    button.ms-auto.btn(title='Odontograma' @click="push({ name: 'pacienteVer', params: { idPaciente: item.id } })")
                        i.bi.bi-person
        b-col.my-1(sm='12' md='12')
            b-pagination.my-0(v-model='currentPage' :total-rows='totalRows' :per-page='perPage' align='center' size='lg')
            
    </b-container>
</template>
  
