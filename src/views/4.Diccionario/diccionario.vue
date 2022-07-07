<script setup>
import { onUnmounted, ref } from "vue";
import { useRoute, useRouter} from "vue-router";
import { item, guardar, actualizar,limpiar, leerEnRegistro } from "../../store/diccionario";
import {isLetter} from '../../config/libreria'

const guardarOActualizar = () => {
  if (item.value?.id) return actualizar(item.value);
  else return guardar(item.value);
};
const {back} = useRouter()
const route = useRoute()
if(route.params.idDiccionario) leerEnRegistro(route.params.idDiccionario)

onUnmounted(()=>{
  limpiar()
})
/*
const cancelar = () =>{
  dialog = false;
  limpiar();
};*/
</script>

<template lang="pug">
Form(:onpromise="()=>guardarOActualizar()" :onsuccess="()=>back()")
  .row
    .col
      input.form-control(placeholder="Código" v-model="item.codigo" required,v-on:keypress="isLetter($event)",maxlength="30")
    .col
      input.form-control(placeholder="Descripción" v-model="item.descripcion" required, v-on:keypress="isLetter($event)", maxlength="50")
  .d-flex
    button.btn.btn-outline-primary(type="button" @click="back()") Cancelar
    button.btn.btn-primary.ms-auto(type="submit") Guardar
</template>

