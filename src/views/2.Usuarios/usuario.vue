<script setup>
import {onUnmounted, ref} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {item, guardar, actualizar,limpiar, leerEnRegistro}  from '../../store/usuario'
const route = useRoute()
const {back} = useRouter()
const guardarOActualizar = () => {
    if (item.value.id) return actualizar(item.value)
    else return guardar( item.value)
}


if(route.params.idUsuario) leerEnRegistro(route.params.idUsuario)

onUnmounted(()=>{
    limpiar()
})

</script>

<template lang="pug">

   
Form( :onPromise=" () => guardarOActualizar()" :onSuccess='()=>back()')
    label.form-label() Documento
    .input-group 
        select.form-control(placeholder="Tipo Documento" v-model="item.tipoDocumento" required)
            option(value="DNI") DNI
            option(value="CE") CARNET DE EXTRANJERIA
        input.form-control(placeholder="Número Documento" v-model="item.numeroDocumento" required)
    .input-group
        input.form-control(placeholder="Nombre", v-model="item.nombre", required)
        input.form-control(placeholder="Apellido Paterno", v-model="item.apellidoPaterno", required)
        input.form-control(placeholder="Apellido Materno", v-model="item.apellidoMaterno", required)
    .row
    
        .col
            input.form-control(type="date", v-model="item.fechaNacimiento", required)
        .col
            select.form-control(placeholder="Sexo", v-model="item.sexo", required)
                option(value="M") MASCULINO
                option(value="F") FEMENINO
    
    .row
        .col
            input.form-control(placeholder="Correo Electrónico", v-model="item.email", type="email", required)
    .row
        .col
            input.form-control(placeholder="Dirección", v-model="item.direccion", required)
    .d-flex
        button.btn.btn-outline-primary(type="button", @click="back() ") Cancelar
        button.btn.btn-primary.ms-auto( type='submit' ) Guardar

</template>

