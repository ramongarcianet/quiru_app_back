<script setup>
import { useRoute, useRouter } from "vue-router";
import { isLetter, isNumber } from '../../config/libreria'
const route = useRoute()
const { back, push } = useRouter();
</script>
<template lang="pug">

.d-flex.align-content-start.flex-wrap
  i.fa-solid.fa-coins.me-2(style="color: #37DFBB; font-weight:bold; font-size: 1.5em;")
  h1(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") Cotizacion
.container.fluid
  .container
    .row.mt-4
      .col.d-flex.justify-content-left 
        span.input-group-text(style="padding: 0.01rem 0.01rem 0.01rem 1.01rem;") Item :
          input.form-control#comboPieza(placeholder="Item")
      .col.d-flex.justify-content-left 
        span.input-group-text(style="padding: 0.01rem 0.01rem 0.01rem 1.01rem;") Precio :
          input.form-control(placeholder="precio", @keypress="isNumber($event)",required,:maxlength="maxDinero")
      .col.d-flex.justify-content-left 
        .div(style="text-align: right;")
          button.btn.btn-primary(style="border-radius: 50%;" @click="push({ name: 'formulario' })")
            i.fa.fa-plus(aria-hidden='true' style="font-weight: bold; color: white;")
    .row
      .col.mt-4
        .div(style="background-color: white; border-radius: 2%;").mt-1
          table.table.table-hover
            thead
              tr
                th Item
                th Precio 
            tbody
              tr(v-for="item of registro"  :key="item.id"  :item="item")
                td {{ item.tipo }}
                td S/. {{ item.precio }}.00
                td
                  button.ms-auto.btn( @click="push({ name: 'formulario', params: { idPaciente: item.id } })")
                    i.fa-solid.fa-pen-clip
                td(width="25%")
                  BotonSeguro( :onSuccess= '() => eliminar(item.id)' )
                    i.fa.fa-trash-o(aria-hidden='true')
.d-flex.mt-5
      button( @click='push({ name: "pacienteVer", params: { idPaciente: route.params.idPaciente } })').btn.btn-primary Volver
</template>