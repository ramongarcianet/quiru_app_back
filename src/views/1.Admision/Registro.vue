<script setup>
import { onUnmounted, ref } from 'vue'
import {obtenerTodos, registro, leerEnRegistro, eliminar, dialog,verOdontograma} from '../../store/admision'
const obtenerRegistro = obtenerTodos()
const confirmar = ref(false)
const confirmarEliminar = id => eliminar(id).then(()=> confirmar.value = false)

</script>
<template lang="pug">
.card.mb-1.d-none.d-md-block(style="border-radius: 30px; background-color:#f5f5f5;")
  .row.align-items-center.p-1
    .col-2.ps-4 Tip Doc.
    .col-2 Número Doc.
    .col-2 Nombres
    .col-2 Fecha Admisión
    .col-2
    .col-1
.card.mb-2.p-2(v-for='item of registro' :key='item.id' :item='item' style="border-radius: 40px")
  .row.align-items-center.p-1
    .col-2.ps-3 {{item.tipoDocumento}}
    .col-2 {{item.numeroDocumento}}
    .col-2 {{item.nombre+ ' '+item.apellidoPaterno +' '+item.apellidoMaterno }}
    .col-2 {{item.fechaAdmision}}
    .col-2
      button.ms-auto.btn.p-0.m-0(@click='leerEnRegistro(item.id)')
        i.fa.fa-solid.fa-pen
    .col-2
      //button.ms-auto.btn.p-1.m-0(@click="confirmar == false ? confirmar = true : confirmarEliminar(item.id) " style="background-color: #AB2E46; color: var(--color-light)") {{confirmar ? 'Confirmar' : 'Borrar'}}
      BotonSeguro( :onSuccess= '() => confirmarEliminar(item.id)' )
        i.fa.fa-trash-o(aria-hidden='true')
</template>

